var theme = {};
theme.preloader = function (message) {
    message = message || 'Loading the content...';
    return (`<div id="status">
        <p class="center-text">`
        + message +
        `</p>\
    </div>`);
};
theme.menuItem = function (item) {
    item = item || {};
    item.link = item.link || '#';
    item.label = item.label || 'LABEL';
    item.iconLeft = item.iconLeft || 'angle-right';
    item.iconRight = item.iconRight || 'circle';
    return (`           
        < a href= "'+item.link+'" >
                            <i class="fa fa-'+item.iconLeft+'"></i>`
        + item.label +
        `<i class="fa fa-'+item.iconRight+'"></i>
                        </a>`);
};
var menu = {};
menu.items = menu.items || [
    { heading: 'NAVIGATION' },
    { item: { link: "index.html", label: 'Homepage', iconLeft: 'home', iconRight: 'angle-right' } },
    {
        item: {
            link: "#", label: 'Features', iconLeft: 'cog', iconRight: 'plus',
            subMenu: [
                { item: { link: "typography.html", label: 'Typography', iconLeft: 'angle-right', iconRight: 'circle' } },
                { item: { link: "jquery.html", label: 'JQuery', iconLeft: 'angle-right', iconRight: 'circle' } },
                { item: { link: "others.html", label: 'Others', iconLeft: 'angle-right', iconRight: 'circle' } }
            ]
        }
    },
    {
        item: {
            link: "#", label: 'Gallery', iconLeft: 'camera', iconRight: 'plus',
            subMenu: [
                { item: { link: "gallery-square.html", label: 'Square Thumbs', iconLeft: 'angle-right', iconRight: 'circle' } },
                { item: { link: "gallery-round.html", label: 'Round Thumbs', iconLeft: 'angle-right', iconRight: 'circle' } },
                { item: { link: "gallery-wide.html", label: 'Wide Thumbs', iconLeft: 'angle-right', iconRight: 'circle' } }
            ]
        }
    },
    { item: { link: "contact.html", label: 'Contact', iconLeft: 'envelope', iconRight: 'angle-right' } },
    { heading: 'SOCIAL' },
    { item: { link: "#", label: 'Facebook', iconLeft: 'home', iconRight: 'angle-right' } },
    { item: { link: "#", label: 'Twitter', iconLeft: 'cog', iconRight: 'plus', } }
];
theme.menu = function (items) {
    var menu = items.map(function (i) {
        if (i['heading'] !== undefined) {
            return (` <div class="sidebar-heading">`
                + i.heading +
                '</div>');
        }
        else {
            if (i['item'] !== undefined) {
                return (this.menuItem(i.item));
            }
        }
        // not supported
        return '';
    });
    return ('<div class="sidebar-navigation">' + menu + '</div>');
};
//# sourceMappingURL=theme.js.map