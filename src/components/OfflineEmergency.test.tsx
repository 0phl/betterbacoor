import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OfflineEmergency } from './OfflineEmergency';
import {
  changeOfflineGuide,
  readOfflineSnapshot,
  supportsOffline,
} from '../data/offline';

vi.mock('../data/offline', () => ({
  offlineGuidePath: '/offline/emergency.html',
  supportsOffline: vi.fn(),
  readOfflineSnapshot: vi.fn(),
  changeOfflineGuide: vi.fn(),
}));
const snapshot = {
  savedAt: '2026-09-16T12:00:00Z',
  reviewed: '2026-09-16',
  version: 'abc',
};
describe('Offline save controls', () => {
  beforeEach(() => {
    vi.mocked(supportsOffline).mockReturnValue(true);
    vi.mocked(readOfflineSnapshot).mockResolvedValue(null);
    vi.mocked(changeOfflineGuide).mockReset();
  });
  it('shows success only after saving completes and removes saved state on request', async () => {
    vi.mocked(changeOfflineGuide)
      .mockResolvedValueOnce(snapshot)
      .mockResolvedValueOnce(null);
    render(<OfflineEmergency />);
    const save = await screen.findByRole('button', {
      name: 'Save emergency essentials',
    });
    expect(screen.queryByRole('link', { name: /Open saved guide/ })).toBeNull();
    fireEvent.click(save);
    expect(
      await screen.findByRole('link', { name: /Open saved guide/ })
    ).toHaveAttribute('href', '/offline/emergency.html');
    expect(screen.getByText(/Emergency essentials saved/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    await waitFor(() =>
      expect(
        screen.queryByRole('link', { name: /Open saved guide/ })
      ).toBeNull()
    );
    expect(screen.getByText(/has been removed/)).toBeInTheDocument();
  });
  it('keeps the saved guide accessible after a failed refresh', async () => {
    vi.mocked(readOfflineSnapshot).mockResolvedValue(snapshot);
    vi.mocked(changeOfflineGuide).mockRejectedValue(
      new Error('Could not save. Existing copy kept.')
    );
    render(<OfflineEmergency />);
    fireEvent.click(
      await screen.findByRole('button', { name: 'Refresh saved guide' })
    );
    expect(
      await screen.findByText('Could not save. Existing copy kept.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Open saved guide/ })
    ).toBeInTheDocument();
  });
  it('provides a download fallback when offline storage is unsupported', async () => {
    vi.mocked(supportsOffline).mockReturnValue(false);
    render(<OfflineEmergency />);
    expect(
      screen.getByText(/Offline saving is unavailable/)
    ).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
    await waitFor(() => expect(readOfflineSnapshot).toHaveBeenCalled());
  });
});
