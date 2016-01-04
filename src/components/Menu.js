'use strict';

var React = require('react');

var defaultTheme = require('../../scss/menu.scss');

var Menu = React.createClass({
  propTypes: {
    themeName: React.PropTypes.string,
    id: React.PropTypes.string
  },
  getDefaultProps: () => {
    return {
      themeName: 'default',
      id: '0',
      items: []
    };
  },
  render: function() {
    var theme = defaultTheme,
    checkboxId = 'show-menu-' + this.props.id;
    return (
      <div className={theme.container}>
        <label htmlFor={ checkboxId } className={theme.showMenuButton}>Show Menu</label>
        <input type="checkbox" id={checkboxId} role="button" className={theme.showMenuCheckbox}/>
        <ul className={theme.menu}>
          {
            this.props.items.map((item, i) => {
              var subMenu;

              if (item.items && item.items.length > 0) {
                subMenu = (
                  <ul key={i} className={theme.subMenu}>
                    {
                      item.items.map((subItem, j) => {
                        return (<li key={j}>
                          <a style={{ cursor: 'pointer' }} onClick={subItem.onClick.bind(this, subItem)}>{subItem.text}</a>
                        </li>);
                      }) }
                    </ul>
                  );
                }

                return (
                  <li key={i} className={theme.item}>
                    <a style={{ cursor: 'pointer' }} onClick={item.onClick.bind(this, item)}>{item.text}</a>
                    {subMenu}
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    }
  });

  module.exports = Menu;
