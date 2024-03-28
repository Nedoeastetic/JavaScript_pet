let arr = [ 
        ];
let promo = document.getElementById('promo');
function Promo()
{
    if(arr.includes(promo.value))
    {
        index = arr.indexOf(promo.value);
        Add = index + 1;
        ColorValue = arr[Add].bg;
        promo.value = "Вы получили:" + arr[Add + 1].disc;
        Button = document.getElementById('btn').style.background = ColorValue;
        localStorage.setItem('Player' , Button );
        document.getElementById('promo').style.borderBottom = '2px solid #8eff04';
    }
    else
    {
        document.getElementById('promo').style.borderBottom = '2px solid #fc5858';
        promo.value = 'Неправильный код';
    }
}