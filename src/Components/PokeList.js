import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2'



class PokeList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if(this.props.errorMsg !== ""){
            return(
                <div>
                    <br/>
                    <h1>Pokemon Requested Not Found</h1>
                </div>
            );
        }
        let count = 0;
        let statObj = {
            datasets : [{
                data:[],
                backgroundColor: [
                    'rgba(246, 85, 135, 0.65)',
                    'rgba(120, 195, 79, 0.65)',
                    'rgba(100, 147, 236, 0.65)',
                    'rgba(246, 201, 46, 0.65)',
                    'rgba(234, 130, 51, 0.65)',
                    'rgba(253, 0, 3, 0.65)',
                ],
                label: 'Stats'
            }],
            labels : [],
        };

        const pokemonStats = this.props.pokemonStats;


        return (
            <div className="PokeList">
                {
                    pokemonStats.map((s) => {
                        statObj.labels.push(s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1));
                        statObj.datasets[0].data.push(s.base_stat);

                        if (count !== 1) {
                            count++;
                            return (
                                <div  className="PokeList" key={s.stat.name}>
                                    <Polar
                                        data = {statObj}
                                        options = {{
                                            title: {
                                                display: this.props.pokemonName,
                                                text: this.props.pokemonName + ' Stats',
                                                fontSize: 25
                                            },
                                            legend:{
                                                position: 'bottom'
                                            },

                                        }}
                                    />
                                    <br/><br/>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default PokeList;
