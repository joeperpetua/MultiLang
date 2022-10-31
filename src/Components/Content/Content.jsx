import React from "react";
import TextInput from "./TextInput/TextInput";
import ResultCard from "./ResultCard/ResultCard";
import { handleTranslate, handleDictionary } from "../../lib/handleTranslation";
import './Content.css';

class Content extends React.Component{

    constructor(props){
        super(props);
        this.runTranslation = this.runTranslation.bind(this);
        this.toggleLoader = this.toggleLoader.bind(this);
        this.clearText = this.clearText.bind(this);
    }

    async runTranslation(){
        let textInput = document.querySelector("#input-text").value;
        this.toggleLoader(true, ".translation-loader");
        this.toggleLoader(true, ".variations-loader");
        await handleTranslate(textInput, JSON.parse( localStorage.getItem("languagesArray") ), this.toggleLoader);
        await handleDictionary(textInput, JSON.parse( localStorage.getItem("languagesArray") ), this.toggleLoader);
    }

    toggleLoader(loading, type){
        let loader = document.querySelector(type);
        if(loading){
            loader.style.display = "flex";
        }else if(!loading) {
            loader.style.display = "none";
        }
    }

    clearText(){
        let textInput = document.querySelector("#input-text");
        let translationElements = document.querySelectorAll(".translation-text");
        let variationsElements = document.querySelectorAll(".variation-text");

        textInput.value = '';
        textInput.focus();
        translationElements.forEach(element => {
            element.innerHTML = '';
        });
        variationsElements.forEach(element => {
            element.innerHTML = '';
            element.parentElement.style.display = 'none';
        });
    }

    render(){
        return <div className="Content">
            <div className="input-div">
                <TextInput runTranslation={this.runTranslation} clearText={this.clearText} />
            </div>
            <div className="result-cards">
                {JSON.parse(localStorage.getItem('languagesArray'))?.map((element, index) => {
                    return <ResultCard key={index} lang={element} />
                })}
            </div>
        </div>;
    };

}

export default Content;