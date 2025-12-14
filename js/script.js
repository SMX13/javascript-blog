'use strict';



function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  if(targetArticle){
    targetArticle.classList.add('active');
  }
}



const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* for each article */
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const titleElement = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    const articleTitle = titleElement.innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' + articleId + '"><span>' +
      articleTitle +
      '</span></a></li>';

    /* insert link into titleList */
    titleList.innerHTML += linkHTML;
  }

  /* add click listeners to generated links */
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
