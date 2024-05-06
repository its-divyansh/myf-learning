import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { Box, Button, LinearProgress, Pagination } from "@mui/material";
import Navbar from "./Navbar";
import Button_component from "./Button";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_APP_API_KEY;

const NewsPage = ({ country, category, pageSize, pageNumber }) => {
  pageSize = Number(pageSize);
  let [articles, setArticles] = useState([]);
  let [loading, setLoading] = useState(true);
  // let [page, setPage] = useState(props.pageNumber);
  let [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();

  // console.log("newspage component called",typeof pageNumber)

  const handleClick = (e, value) => {
    console.log(value);
    if (value > 0 && value <= Math.ceil(totalResults / pageSize))
      navigate("/user/" + category + "/" + value);
  };
  const fetchData = async () => {
    setLoading(true);
    try{
      setArticles([]);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${pageNumber}&pageSize=${pageSize}`;
    // setPage(currPage);
    let data = await fetch(url);
    let parsedData = await data.json();
    if(parsedData.status==='error'){
      navigate("/user/error", {state:{error : "page number"}});
    }
    // console.log(parsedData);
    setTotalResults(parsedData.totalResults);
    if(parsedData.totalResults ===0){
      navigate("/user/error",{state:{error: "category"}});
    }
    parsedData = parsedData.articles.filter((data)=> data.title!=='[Removed]' && data.description!=='[Removed]')
    // console.log(parsedData);
    // setArticles(articles.concat(parsedData.articles));
    setArticles(parsedData);
    }
    catch(error){
      console.log(error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    // console.log(props);
    fetchData();
  }, [category, pageNumber]);

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {articles.map((data) => (
          <NewsCard key={data.title} data={data} />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>

        {/* <Button_component name="prev" disabled={pageNumber<=1} onclick={()=>navigate("/user/"+category+"/"+String(Number(pageNumber)-1))}/>
    <Button_component name="next" disabled={pageNumber*pageSize>=totalResults} onclick={()=>navigate('/user/'+category+"/"+String(Number(pageNumber)+1))}/> */}

        {!loading && (
          <Pagination
            count={Math.ceil(totalResults / pageSize)}
            defaultPage={pageNumber}
            onChange={handleClick}
            showFirstButton
            showLastButton
            siblingCount={1}
            size="large"
            sx={{ backgroundColor: "#ADD8E6" , margin:"5px"}}
          />
        )}
      </Box>
    </>
  );
};

export default NewsPage;
