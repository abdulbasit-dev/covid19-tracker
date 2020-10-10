export const sortDate = data => {
  const sortedData = [...data]
  //1 stand for true and -1 stand for false
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}
