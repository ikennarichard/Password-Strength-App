const strengthMeter = document.getElementById('strength-meter');
const passwordInput = document.getElementById('password-input');
const reasonsContainer = document.getElementById('reasons');

passwordInput.addEventListener('input', updateStrengthMeter)

updateStrengthMeter()

function updateStrengthMeter() {
    const weaknesses = calculatePasswordStrength(passwordInput.value);

    let strength = 100
    reasonsContainer.innerHTML = '';

    weaknesses.forEach(weakness => {

        if (weakness == null) return
        strength -= weakness.deduction; const messageElement = document.createElement('div')
        messageElement.innerText = weakness.message
        reasonsContainer.appendChild(messageElement)

    })
    strengthMeter.style.setProperty('--strength', strength)
}

function calculatePasswordStrength(password) {
    const weaknesses = [];
    weaknesses.push(lengthOfWeaknesses(password))
    weaknesses.push(lowercaseCharacter(password))
    weaknesses.push(uppercaseCharacter(password))
    weaknesses.push(numberCharacter(password))
    weaknesses.push(specialCharacter(password))
    weaknesses.push(repeatCharacter(password))
    return weaknesses;
}

function lengthOfWeaknesses(password) {
    const length = password.length;


    if (length <= 5) {
        return {
            message: 'Password must be at least 12 characters',
            deduction: 80
        }
    }


    if (length <= 10) {
        return {
            message: 'Password could be longer',
            deduction: 50
        }
    }
}


function lowercaseCharacter(password) {
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters')
}

function uppercaseCharacter(password) {
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')
}

function numberCharacter(password) {
    return characterTypeWeakness(password, /[0-9]/g, 'numbers')
}

function specialCharacter(password) {
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
}

function characterTypeWeakness(password, regex, type) {
    const matches = password.match(regex) || []

    if (matches.length === 0) {
        return {
            message: `Password must include ${type}`,

            deduction: 20
        }
    }
}

function repeatCharacter(password) {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
        return {
            message: 'Your password has repeat characters',
            deduction: matches.length * 10
        }
    }
}

