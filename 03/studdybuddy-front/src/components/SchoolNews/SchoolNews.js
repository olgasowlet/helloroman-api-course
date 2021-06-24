import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';
import { Article, ArticleImage, Articles, Title, Wrapper } from 'components/SchoolNews/SchoolNews.styles';

const query = gql`{
  allArticles {
    title
    content
    image {
      alt
      url
    }
  }
}`;

const SchoolNews = () => {
  const { loading, error, data } = useQuery(query);

  //Dodać przycisk "czytaj dalej" w poszczególnych artykułach żeby tyle tekstu się nie wyświetlało od razu ale żeby można było go rozwinąć
  return (
    <Wrapper>
      <Title>Gazetka szkolna</Title>
      <Articles>
        {loading && <h3>Ładowanie artykułów...</h3>}
        {(!loading && !error) ? (
          data.allArticles.map(article => (
            <Article key={article.title}>
              <ArticleImage>
                <img src={article.image.url} alt={article.image.alt} />
              </ArticleImage>
              <div>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
              </div>
            </Article>
          ))) : null}
          {error && <h3>Wystąpił błąd</h3>}
      </Articles>
    </Wrapper>
  );
};

SchoolNews.propTypes = {};

export default SchoolNews;
