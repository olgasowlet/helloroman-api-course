import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Article, ArticleImage, Articles, Title, Wrapper } from 'components/SchoolNews/SchoolNews.styles';

const query = `{
  allArticles {
    title
    content
    image {
      alt
      url
    }
  }
}`;

const DATO_TOKEN = `637c0f02361ac0d8fc533a1bacb2eb`;

const SchoolNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DATO_TOKEN}`,
      },
      body: JSON.stringify({
        query
      })
    }).then(response => response.json())
      .then(({ data }) => setArticles(data.allArticles))
      .catch(error => console.log(error))
  }, []);

  //Dodać przycisk "czytaj dalej" w poszczególnych artykułach żeby tyle tekstu się nie wyświetlało od razu ale żeby można było go rozwinąć
  return (
    <Wrapper>
      <Title>Gazetka szkolna</Title>
      <Articles>
        {articles ? articles.map(article => (
          <Article key={article.title}>
            <ArticleImage>
              <img src={article.image.url} alt={article.image.alt} />
            </ArticleImage>
            <div>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          </Article>
        )) : <h3>Brak artykułów</h3>}
      </Articles>
    </Wrapper>
  );
};

SchoolNews.propTypes = {};

export default SchoolNews;
