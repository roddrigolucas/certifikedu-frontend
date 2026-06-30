export const getTextFilterCounterServerSideText = (
  items = [],
  pagesCount: number,
  pageSize: number,
) => {
  const count = pagesCount > 1 ? `${pageSize * (pagesCount - 1)}+` : items.length + '';

  return count === '1' ? `1 item` : `${count} itens`;
};

export const getTextFilterCounterText = (count: number) =>
  `${count} ${count === 1 ? 'item' : 'itens'}`;
