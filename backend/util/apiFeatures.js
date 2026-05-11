class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search blogs by title
    search() {
        let keyword = this.queryStr.keyword
            ? { title: { $regex: this.queryStr.keyword, $options: 'i' } }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStrCopy = { ...this.queryStr };
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);
        this.query = this.query.find(queryStrCopy);
        return this;
    }
}

module.exports = APIFeatures;
