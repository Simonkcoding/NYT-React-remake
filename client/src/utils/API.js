import axios from 'axios';

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&q=";
const APIKEY = "&api-key=d2e29213b6054f549f790d8b818c67eb";

export default {
    searchArticles: function(query){
        return axios.get(BASEURL + query.searchTitle 
            +'&begin_date='+query.beginDate
            +'&end_date='+query.endDate 
            + APIKEY);
    },
    saveArticle:function(data){
        return axios.post("/api/articles/",data);
    },
    getSavedArticles: function(){
        return axios.get("/api/articles/");
    },
    deleteSavedArticle: function(id){
        return axios.delete("/api/articles/" + id);
    }
}