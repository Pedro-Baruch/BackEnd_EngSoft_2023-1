export class Post{
    id: number
    text: string
    title: string
    date: Date

    constructor(id: number,text: string, title: string, date: Date){
        this.id = id
        this.text = text
        this.title = title
        this.date = date
    }
}