class TimeRecord {
    constructor(
        public id: number = null,
        public title: string,
        public initDateTime: string,
        public endDateTime: string,
        public duration: string = ''
        ) {}
}

// interface TimeRecord {
//     id: number
//     title: string
//     initDate: string
//     endDate: string
//     duration: string
// }

export { TimeRecord }