const ArticleList = ({articleSettings}) => {
  const modifiedObject = Object.values(articleSettings).map((value, key) => {
    return (
      <div>
        <a key={key} href={value['url']}>{value['category']}{value['url']}</a>
      </div>
    )
  })
  return (
    <div>
      {modifiedObject}
    </div>
  )
}

export default ArticleList

