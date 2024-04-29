import React, { useState,useEffect } from 'react'
import NewsCard from './NewsCard'
import { Box, Button } from '@mui/material'
import Navbar from './Navbar';
import Button_component from './Button';

const apiKey = import.meta.env.VITE_APP_API_KEY;

const NewsPage = (props) => {
  let [articles, setArticles] = useState([]);
  let [loading, setLoading] = useState(true);
  let [page, setPage] = useState(0);
  let [totalResults, settotalResults] = useState(0);

  const fetchData = async (currPage) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${currPage}&pageSize=${props.pageSize}`;
    setPage(currPage);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // setArticles(articles.concat(parsedData.articles));
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);    
  };

  useEffect(()=>{
    console.log(props);
    fetchData(1);
  },[props.category]);

  return (
    <>
    <Box sx={{ display: 'flex', flexWrap :'wrap', justifyContent: "space-evenly" }}>
       {articles.map(data => <NewsCard key = {data.title} data={data}  />)}
    </Box>
    <Box sx={{display:'flex', justifyContent:"space-evenly"}}>
    <Button_component name="prev" disabled={page<=1} onclick={()=>fetchData(page-1)}/>
    <Button_component name="next" disabled={page*props.pageSize>=totalResults} onclick={()=>fetchData(page+1)}/>
    </Box>
    </>
  )
}

export default NewsPage
