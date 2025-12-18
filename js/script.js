'use strict';



function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  if (targetArticle) {
    targetArticle.classList.add('active');
  }
}



const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optAuthorsListSelector = '.authors';
const optTagsListSelector = '.tags';




function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  /* for each article */
  for (let article of articles) {

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
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      /* add generated code to html variable */
      html += tagHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (allTags.indexOf(tagHTML) == -1) {
        /* [NEW] add generated code to allTags array */
        allTags.push(tagHTML);
      }

    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');

}


generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (const activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (const tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = [];

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article */
  for (const article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector('.post-author');

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');

    /* generate HTML of the link */
    const authorHTML = `<a href="#author-${author}">${author}</a>`;

    /* [NEW] check if this author is NOT already in allAuthors */
    if (allAuthors.indexOf(authorHTML) == -1) {
      /* [NEW] add author to allAuthors array */
      allAuthors.push(authorHTML);
    }


    /* insert HTML into the author wrapper */
    authorWrapper.innerHTML = 'by ' + authorHTML;
  }
  /* END LOOP: for every article */

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);

  /* [NEW] add html from allAuthors to authorsList */
  authorsList.innerHTML = allAuthors.join(' ');

}

generateAuthors();





