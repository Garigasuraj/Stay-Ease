class ClassError extends Error{
    constructor(status,description){
        super()
        this.status = status
        this.description = description
    }
}

module.exports = ClassError