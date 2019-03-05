class TimeRecord {
    constructor(
        public id: number = null,
        public title: string,
        public initDateTime: Date,
        public endDateTime: Date,
        public duration: string = ''
        ) {}
}

export { TimeRecord }