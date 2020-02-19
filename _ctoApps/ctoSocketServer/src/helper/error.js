export default function Error() {

    this.handle = function(error)  {
        if (error) {
            return console.error(error);
        }
    }

}