import React, { Component } from 'react';
import axios from "axios";

import PokeList from './PokeList';

class PokeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonName : "",
            pokemonStats: [],
            pokemonPic : "",
            POKE_URL : "https://pokeapi.co/api/v2/pokemon/",

            errorMsg : "",
            loading : <div><img className=".loading"/></div>
        };

        this.getPokemonInfo = this.getPokemonInfo.bind(this);
        this.submitPokemon = this.submitPokemon.bind(this);
    }

    getPokemonInfo(pokemon) {

        return axios.get(this.state.POKE_URL + pokemon + "/")
            .then((response) => {
                let formattedPokemonName = response.data.name;
                let tamperVar = response.data.name;
                let indexOfDash;
                let caps = [0];
                let capsIndex = 0;

                while(tamperVar.indexOf('-') !== -1) {
                    indexOfDash = tamperVar.indexOf('-');
                    caps.push(indexOfDash + caps[capsIndex] + capsIndex);
                    tamperVar = tamperVar.slice(indexOfDash + 1);
                    capsIndex++;
                }

                for(let i = 1; i < caps.length; i++){
                    caps[i] = caps[i] + 1;
                }

                for(let j = 0; j < caps.length; j++){
                    formattedPokemonName = formattedPokemonName.replace(formattedPokemonName.charAt(caps[j]), formattedPokemonName.charAt(caps[j]).toUpperCase());

                }
                this.setState({
                    pokemonPic : response.data.sprites.front_default,
                    pokemonStats: response.data.stats,
                    pokemonName : formattedPokemonName.replace(/-/g, ' '),
                    errorMsg : "",
                    loading : <img className="loading"/>
                });
            })
            .catch(error => {
                this.setState({
                    pokemonPic : "",
                    errorMsg : error.response.data.detail,
                    loading: <img className="loading"/>
                })
            })
    }

    submitPokemon(e){
        e.preventDefault();
        let pokemon = document.getElementById("userPokemon").value.toLowerCase().replace(/\s/g,'');
        this.setState({
            loading: <div><p className="inlineBlock">Finding and Catching</p><img className="loading" src ={require("../Loading.png")}/><p className="inlineBlock">Requested Pokemon</p></div>,
        }, () => {
            this.getPokemonInfo(pokemon);
        });
    }

    render() {

            return (
                <div className="PokeForm">

                    <h1><strong>PokeStats</strong></h1>

                    <h2>Enter a Pokemon's Name or ID Number and see its Base Stats </h2>
                    <p>
                        Note: To input Pokemon with forms or characters in its name <br/>(Deoxys, Mega, Mr. Mime, etc.), add a "-" as the space.
                        <br/>Example: "Deoxys-normal", "Charizard-Mega-X, Mr-Mime"
                    </p>

                    <form onSubmit={this.submitPokemon}>
                        <input type="text" id="userPokemon" placeholder="Insert Pokemon"/>
                        <input type="button" value="Get Stats" onClick={this.submitPokemon}/>
                        <br/>
                        {this.state.loading}
                    </form>

                    <img className="img-fluid" src={this.state.pokemonPic} alt=""/>
                    <PokeList pokemonStats={this.state.pokemonStats} pokemonName = {this.state.pokemonName} errorMsg = {this.state.errorMsg}/>
                    <p className="footer">Created using React and <a target= "blank" href="http://pokeapi.co/"> PokeAPI </a></p>
                </div>
            );
        }

}

export default PokeForm;
