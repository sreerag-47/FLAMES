
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const dob1Input = document.getElementById('dob1');
const dob2Input = document.getElementById('dob2');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');


calculateBtn.addEventListener('click', () => {

    const name1 = name1Input.value.trim().toLowerCase();
    const name2 = name2Input.value.trim().toLowerCase();
    const dob1 = dob1Input.value.trim();
    const dob2 = dob2Input.value.trim();

    if (name1 === '' || name2 === '' || dob1 === '' || dob2 === '') {
        alert('Pere adichite noke'); 
        return;
    }

    console.log(`Name 1: ${name1}, DOB 1: ${dob1}`);
    console.log(`Name 2: ${name2}, DOB 2: ${dob2}`);

    const flameresult = calculateflames(name1, name2);
    const zodiac1 = getZodiacSign(dob1);
    const zodiac2 = getZodiacSign(dob2);
    const compatibilityResult = getCompatibility(zodiac1, zodiac2);

    const resultHTML = `
        <h2>FLAMES Result: ${flameresult}</h2>
        <p><strong>Zodiac Signs:</strong> ${zodiac1} & ${zodiac2}</p>
        <p><strong>Compatibility:</strong> ${compatibilityResult}</p>
    `;

    document.getElementById("result").innerHTML = resultHTML;
});
function calculateflames(name1, name2) {
    let name1Arr = name1.split('');
    let name2Arr = name2.split('');
    for (let i = 0; i < name1Arr.length; i++) {
        for (let j = 0; j < name2Arr.length; j++) {
            if (name1Arr[i] === name2Arr[j]) {
                name1Arr.splice(i, 1);
                name2Arr.splice(j, 1);
                i--;
                break;
            }
        }
    }
    const count = name1Arr.length + name2Arr.length;
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    const flameMap = {
        'F': 'Friends',
        'L': 'Love',
        'A': 'Affection',
        'M': 'Marriage',
        'E': 'Enemies',
        'S': 'Siblings'
    };
    let index = 0;
    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
    }
    return flameMap[flames[0]];
}

function getZodiacSign(dateString) {
    const month = parseInt(dateString.substring(5, 7));
    const day = parseInt(dateString.substring(8, 10));

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
}

function getCompatibility(zodiac1, zodiac2) {
    const compatibilityMap = {
        'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
        'Taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
        'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
        'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
        'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
        'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
        'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
        'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
        'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
        'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
        'Aquarius': ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
        'Pisces': ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
    };

    let compatibility = "Not that great, but don’t worry — if it’s real, it will work.";
    if (compatibilityMap[zodiac1] && compatibilityMap[zodiac1].includes(zodiac2)) {
        compatibility = "It’s considered a good match. If you feel it, just give it a try!";
    }
    return `${zodiac1} and ${zodiac2}: ${compatibility}`;
}
