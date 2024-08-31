
class APIFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr

    }
// search the Blogs using Blog's title 
    search(){
        let keyword = this.queryStr.keyword? {
            title:{
                $regex : this.queryStr.keyword,
                $options :'i'
            }
        } : {}

        this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryStrCopy = {...this.queryStr}
        //before 
        console.log("before")
        console.log(queryStrCopy);

        //removing field from query
        const removeFields = ['keyword','limit','page'];
        removeFields.forEach(field => delete queryStrCopy[field]);

        //after
        console.log("after")
        console.log(queryStrCopy)

        this.query.find(queryStrCopy);
        return this;
    }
}

module.exports = APIFeatures;