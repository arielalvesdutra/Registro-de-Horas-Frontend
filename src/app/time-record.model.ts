class TimeRecord {
    constructor(
        public id: number = null,
        public title: string,
        public initDate: string,
        public endDate: string,
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