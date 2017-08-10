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
        };

        this.getPokemonInfo = this.getPokemonInfo.bind(this);
        this.submitPokemon = this.submitPokemon.bind(this);
    }

    getPokemonInfo(pokemon) {

        return axios.get(this.state.POKE_URL + pokemon + "/")
            .then((response) => {
                this.setState({
                    pokemonPic : response.data.sprites.front_default,
                    pokemonStats: response.data.stats,
                    pokemonName : response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1) ,
                    errorMsg : "",
                });
            })
            .catch(error => {
                this.setState({
                    pokemonPic : "",
                    errorMsg : error.response.data.detail
                })
            })
    }

    submitPokemon(){

        let pokemon = document.getElementById("userPokemon").value.toLowerCase().replace(/\s/g,'');
        this.getPokemonInfo(pokemon);

    }


    render() {

            return (
                <div className="PokeForm">

                    <h1><strong>PokeStats </strong></h1>

                    <h2>Enter a Pokemon's Name or ID Number and see its Base Stats </h2>
                    <p>
                        [Currently compatible for pokemon in Gen VI or earlier]<br/></p>
                    <p>
                        Note: To input pokemon with forms or characters in its name <br/>(Deoxys, Mega, Mr. Mime, etc.), add a "-" as the space.
                        <br/>Example: "Deoxys-normal", "Charizard-Mega-X, Mr-Mime"
                    </p>

                    <form>
                        <input type="text" id="userPokemon" placeholder="Insert Pokemon"/>
                        <input type="button" value="Get Stats" onClick={this.submitPokemon}/>
                    </form>

                    <img className="img-fluid" src={this.state.pokemonPic} alt=""/>
                    <PokeList pokemonStats={this.state.pokemonStats} pokemonName = {this.state.pokemonName} errorMsg = {this.state.errorMsg}/>
                    <p className="footer">Created using React and <a target= "blank" href="http://pokeapi.co/"> PokeAPI </a></p>
                </div>
            );
        }

}

export default PokeForm;
