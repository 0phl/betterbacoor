const aliases: Record<string, string> = {
  ospital: 'hospital',
  sertipiko: 'certificate',
  kapanganakan: 'birth',
  kasal: 'marriage',
  pagkamatay: 'death',
  trabaho: 'work',
  hanapbuhay: 'employment',
  negosyo: 'business',
  tanggapan: 'office',
  kalusugan: 'health',
  pamahalaan: 'government',
  dokumento: 'documents',
  kailangan: 'requirements',
  bayarin: 'fees',
  pagbili: 'procurement',
  panahon: 'weather',
  ulan: 'rain',
  anunsiyo: 'announcements',
  anunsyo: 'announcements',
  badyet: 'budget',
};
export function bilingualSearch(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/sentro ng kalusugan/g, 'health center')
    .replace(/\b[a-z]+\b/g, word => aliases[word] ?? word)
    .replace(/\b(mga|ng|sa|ang|para|at)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
