const VALID_DDB_TYPES = {
  s: 'S',
  l: 'L',
  m: 'M',
  n: 'N',
  nULLValue: 'NULL',
  bOOL: 'BOOL'
};

const pipe = (...fns) => x => fns.reduce((res, fn) => fn(res), x);

const getValidDDBObject = pipe(
  JSON.stringify,
  ...Object.entries(VALID_DDB_TYPES).map(
    ([invalidType, validType]) =>
      str => str.replace(new RegExp(`"${invalidType}":`, 'g'), `"${validType}":`)
  ),
  JSON.parse
);

module.exports = getValidDDBObject;
