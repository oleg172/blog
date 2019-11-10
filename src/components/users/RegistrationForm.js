import React, {Component} from 'react';

import Input from '../Input';
import Button from '../Button';

import ApiService from '../../service/ApiService';

import '../../css/registration/registrationFormStyle.css';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
            },
            validation: {
                emailValid: false,
                nameValid: false,
                passwordValid: false,
                confirmPasswordValid: false
            },
            error: {
                emailMessage: '',
                nameMessage: ''
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let userData = this.state.newUser;
        if (this.state.validation.emailValid &&
            this.state.validation.nameValid &&
            this.state.validation.passwordValid &&
            this.state.validation.confirmPasswordValid) {
                var self = this;
                ApiService.addUser(userData)
                .then(function(response){
                    console.log(response);
                })
                .catch(function (error) {
                    if(error.response.data != null) {
                        if(error.response.data.status == 'BAD_REQUEST' 
                        && error.response.data.rootCause != null) {
                            let rootCause = error.response.data.rootCause;
                            switch(rootCause) {
                                case 'EMAIL_CONSTRAINT':
                                    self.setState(prevState => ({validation: 
                                        {...prevState.validation, emailValid: false}
                                    }));
                                    self.setState(prevState => ({ error :
                                        {...prevState.error, emailMessage: 'Пользователь с таким \'e-mail\' уже существует'}  
                                    }));
                                    break;
                                case 'NAME_CONSTRAINT':
                                    self.setState(prevState => ({validation: 
                                        {...prevState.validation, nameValid: false}
                                    }));
                                    self.setState(prevState => ({ error :
                                        {...prevState.error, nameMessage: 'Пользователь с таким \'Ником\' уже существует'}  
                                    }));
                                    break;
                                //TODO if unknown rootCause???    
                            }
                        }
                        //TODO
                    }
                 });;
            } 
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => ({ newUser : 
            {...prevState.newUser, [name]: value}
          }), () => this.validateField(name, value))
   }
   
   validateField(fieldName, value) {
        let emailValid = this.state.validation.emailValid;
        let nameValid = this.state.validation.nameValid;
        let passwordValid = this.state.validation.passwordValid;
        let confirmPasswordValid = this.state.validation.confirmPasswordValid;

        switch(fieldName) {

            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                this.setState(prevState => ({ error :
                    {...prevState.error, emailMessage: 'E-mail не верен'}  
                }));
                this.setState(prevState => ({ validation :
                    {...prevState.validation, emailValid: emailValid}  
                }));
                break;
            case 'name':
                nameValid = value.length >= 3;
                this.setState(prevState => ({ error :
                    {...prevState.error, emailMessage: 'Имя должно содерть по крайней мере 3 символа'}  
                }));
                this.setState(prevState => ({ validation :
                    {...prevState.validation, nameValid: nameValid}  
                }));
                break;    
            case 'password':
                passwordValid = this.validatePassword(value);

                this.setState(prevState => ({ validation :
                    {...prevState.validation, passwordValid: passwordValid}  
                }));
                confirmPasswordValid = this.state.newUser.confirmPassword == value;
                this.setState(prevState => ({ validation :
                    {...prevState.validation, confirmPasswordValid: confirmPasswordValid}  
                }));
                break;
            case 'confirmPassword':
                confirmPasswordValid = this.state.newUser.password == value;
                this.setState(prevState => ({ validation :
                    {...prevState.validation, confirmPasswordValid: confirmPasswordValid}  
                }));
                break;
            default: 
                break;
        }
    }

    validatePassword(password) {
        const passwordLength = 8; 
        let lowerCaseContains = (/[a-z]/.test(password));
        let capitalCaseContains = (/[A-Z]/.test(password));
        let numberContains = (/[0-9]/.test(password));
        if(password.length < passwordLength){
            return false;
        }
        if(lowerCaseContains && capitalCaseContains && numberContains){
            return true;
        } else {
            return false;
        }
    }

    render() {
        return(
            <div className = 'wrapper'>
                <div className='form-wrapper'>
                    <h2>Регистрация</h2>
                    <form className = 'container-fluid'>
                        <Input inputType = {'email'}
                            title = {'E-mail'}
                            name = {'email'}
                            value = {this.state.newUser.email}
                            placeholder = {'Введите ваш \'E-mail\''}
                            handleChange = {this.handleInput}
                            isValid = {this.state.validation.emailValid}
                            errorMessage = {this.state.error.emailMessage}/>
                        <Input inputType = {'text'}
                            title = {'Никнейм'}
                            name = {'name'}
                            value = {this.state.newUser.name}
                            placeholder = {'Введите свой \'Никнейм\''}
                            handleChange = {this.handleInput}
                            isValid = {this.state.validation.nameValid}
                            errorMessage = {this.state.error.nameMessage}/>
                        <Input inputType = {'password'}
                            title = {'Пароль'}
                            name = {'password'}
                            value = {this.state.newUser.password}
                            placeholder = {'Введите ваш \'Пароль\''}
                            handleChange = {this.handleInput}
                            isValid = {this.state.validation.passwordValid}
                            errorMessage = {'Пароль должен содержать как минимум 8 символов: содержать как миниму 1 цифру, 1 заглавную латинскую букву и 1 строчную латинскую букву'}/>
                        <Input inputType = {'password'}
                            title = {'Подтвердите пароль'}
                            name = {'confirmPassword'}
                            value = {this.state.newUser.confirmPassword}
                            placeholder = {'Подтвердите ваш \'Пароль\''}
                            handleChange = {this.handleInput}
                            isValid = {this.state.validation.confirmPasswordValid}
                            errorMessage = {'Пароли не совпадают'}/>
                        <Button action = {this.handleFormSubmit}
                            type = {'primary'}
                            title = {'Зарегестрироваться'}
                            disabled = {!(this.state.validation.emailValid
                                && this.state.validation.nameValid
                                && this.state.validation.passwordValid
                                && this.state.validation.confirmPasswordValid)}/>                
                    </form>
                </div>
            </div>
        );
    }
}


export default RegistrationForm;