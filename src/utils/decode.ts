import iconv from 'iconv-lite';

export const decodeString = (data: string): string => {
  return iconv.decode(Buffer.from(data, 'utf-16le'), 'utf8');
};
