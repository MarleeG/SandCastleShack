import React, { Component } from 'react';
import { Alert, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

import './menuSelection.css'

class MenuSelection extends Component {
    constructor(props) {
        super(props);
        this.menu = this.menu.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.menuOptions = this.menuOptions.bind(this);
        this.menuItemsSelected = this.menuItemsSelected.bind(this)
        this.defaultSetting = this.defaultSetting.bind(this);
        this.changeMenuPrice = this.changeMenuPrice.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);

        this.state = {
            buttonText: 'ORDER',
            currentKidQuestion: 1,
            currentTeenQuestion: 1,
            currentAdultQuestion: 1,
            currentSeniorQuestion: 1,
            maximumOrders: 0,
            members: '',
            menu: [
                { type: 'Soup', price: 2.5, checked: false },
                { type: 'Wings', price: 5.75, checked: false },
                { type: 'Burger', price: 4.95, checked: false },
                { type: 'Chicken Sandwhich', price: 5.95, checked: false },
                { type: 'Fries', price: 1.99, checked: false },
                { type: 'Pie', price: 2.95, checked: false },
                { type: 'Ice Cream', price: 2.99, checked: false },
                { type: 'Soft Drink', price: 1.5, checked: false },
                { type: 'Coffee', price: 1, checked: false }
            ],
            message: '',
            orderButton: false,
            orderPrices: [],
            orders: 0,
            originalPricing: [],
            position: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth'],
            totalOrdersMade: 0,
            orderingFor: 'kid'
        }
    }

    componentWillReceiveProps(props) {
        if (props.attendingMembers !== undefined) {
            this.setState({
                members: props.attendingMembers,
                maximumOrders: props.attendingMembers.kids + props.attendingMembers.teens + props.attendingMembers.adults + props.attendingMembers.seniors
            }, () => {
                this.handleOrder();
            })
        }
    }

    calculateTotal() {
        this.setState({
            orderButton: true,
            message: ''
        })
        var total = 0;
        this.state.orderPrices.forEach(element => {
            total += element;
        })
        this.props.getTotal(total);
    }


    handleOrder() {
        var original_prices = []
        this.state.menu.forEach(element => {
            original_prices.push(element.price);
        })

        this.setState({
            originalPricing: original_prices
        })

        const { kids, teens, adults, seniors } = this.state.members;
        if (kids > 0 && this.state.currentKidQuestion <= kids) {

            this.changeMenuPrice(0);
            const kid_position = this.state.position[this.state.currentKidQuestion - 1];

            this.setState({
                message: `What will the ${kid_position} ${this.state.orderingFor} order?`
            });

        } else {
            const position = this.state.position[this.state.currentTeenQuestion - 1];

            if (teens > 0 && this.state.currentTeenQuestion <= teens) {
                this.setState({
                    orderingFor: 'teen',
                }, () => {
                    this.setState({
                        message: `What will the ${position} ${this.state.orderingFor} order?`
                    })
                    this.changeMenuPrice(.85);
                })
            } else {
                if (adults > 0 && this.state.currentAdultQuestion <= adults) {
                    const adult_position = this.state.position[this.state.currentAdultQuestion - 1];
                    this.setState({
                        orderingFor: 'adult'
                    }, () => {
                        this.setState({
                            message: `What will the ${adult_position} ${this.state.orderingFor} order?`
                        })
                        this.changeMenuPrice(1);
                    })
                } else {
                    if (seniors > 0 && this.state.currentSeniorQuestion <= seniors) {

                        const senior_position = this.state.position[this.state.currentSeniorQuestion - 1];
                        this.setState({
                            orderingFor: 'senior'
                        }, () => {
                            this.setState({
                                message: `What will the ${senior_position} ${this.state.orderingFor} order?`
                            })
                            this.changeMenuPrice(.25)
                        })
                    }

                }
            }
        }
    }

    handleSubmit() {
        var pricing = 0;
        this.state.menu.forEach(item => {
            if (item.checked) {
                pricing += item.price
            }
        })

        switch (this.state.orderingFor) {
            case 'kid': this.setState({ currentKidQuestion: this.state.currentKidQuestion + 1 }); break;
            case 'teen': this.setState({ currentTeenQuestion: this.state.currentTeenQuestion + 1 }); break;
            case 'adult': this.setState({ currentAdultQuestion: this.state.currentAdultQuestion + 1 }); break;
            case 'senior': this.setState({ currentSeniorQuestion: this.state.currentSeniorQuestion + 1 }); break;
            default: alert('ERROR: RELOAD PAGE')
        }

        this.setState({
            orderPrices: [pricing, ...this.state.orderPrices],
            orders: this.state.orders + 1,
        }, () => {
            if (this.state.orders === this.state.maximumOrders) {
                this.calculateTotal()
            } else {
                this.defaultSetting();
                this.handleOrder();
            }

        })
    }

    defaultSetting() {
        var menuItems = [];
        this.state.menu.forEach(element => {
            menuItems.push(element)
        });

        menuItems.forEach((element, index) => {
            element.price = this.state.originalPricing[index]
            if (element.checked) {
                element.checked = false
            }
        });

        this.setState({
            menu: menuItems
        });
    }

    changeMenuPrice(percentage) {
        var menuItems = this.state.menu;
        menuItems.forEach(item => {
            item.price = item.price.toFixed(2) * percentage
        });

        this.setState({
            menu: menuItems
        })
    }

    menuItemsSelected(index) {
        var all_menu_items = [];
        this.state.menu.forEach(x => all_menu_items.push(x));
        all_menu_items[index].checked = !this.state.menu[index].checked;
        this.setState({
            menu: all_menu_items
        })
    }

    menuOptions() {
        return (
            this.state.menu.map((menuItem, index) => {
                return (
                    <option key={index} onClick={() => this.menuItemsSelected(index)} value={menuItem.type}>{menuItem.type}..........${menuItem.price.toFixed(2)}</option>
                )
            })
        )
    }
    menu() {
        return (
            <div className='menuOptions'>
                <FormGroup controlId="formControlsSelectMultiple">
                    <ControlLabel>Select from the menu below</ControlLabel>
                    <ControlLabel>Hold <code>CMD</code> down to select multiple</ControlLabel>

                    <FormControl componentClass="select" disabled={this.state.orderButton} multiple>
                        {this.menuOptions()}
                    </FormControl>
                    <br />
                    <Button type="submit" bsStyle='primary' disabled={this.state.orderButton} onClick={this.handleSubmit}>{this.state.buttonText}</Button>
                </FormGroup>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.appear ?
                    <div>
                        <h4 className='questionThree'>
                            What's on the Castle Shack menu?
                        </h4>
                        {this.state.message ? <div>
                            <Alert bsStyle="info" onDismiss={this.handleDismiss} className='alert-message'>
                                <h4>
                                    {this.state.message}
                                </h4>
                            </Alert>
                        </div> : null}
                        <div className='contentsThree'>
                            {this.menu()}
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default MenuSelection;