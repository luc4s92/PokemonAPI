console.log('hola mundo')

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151)
    fetchData(random)  
})

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async(id) => {
    try {
        const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)  
        const data = await req.json()
        
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            experience: data.base_experience,
            atack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            atackSpecial: data.stats[3].base_stat,
            
        }

        pintarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const pintarCard = (pokemon) =>{
    //console.log(pokemon)

    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`
    clone.querySelector('.card-body-text').textContent = pokemon.experience + ' xp'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.atack
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.atackSpecial
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defense


    fragment.appendChild(clone)
    flex.appendChild(fragment)
}