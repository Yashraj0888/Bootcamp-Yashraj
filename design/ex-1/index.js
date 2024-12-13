let arr = [1, 5, 8, 4, 6, 7, 8, 4];

for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
        console.log(arr[i])
    }, arr[i]); 
}
