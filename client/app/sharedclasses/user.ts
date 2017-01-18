/**
 * Created by HP PC on 15-01-2017.
 */
export class User {
    constructor(
        public userName: string,
        public password:string,
        public cnfPassword: string,
        public email: string,
        public age: number
    ) {  }
}