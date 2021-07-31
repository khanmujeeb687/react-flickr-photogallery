export class Actions{
    static CHANGE_NAME = 'CHANGE_NAME';



    static changeName(value:string){
        return {
            type: Actions.CHANGE_NAME,
            value
        }
    }
}


