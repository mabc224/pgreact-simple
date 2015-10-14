
/**
 * React components: users form and table.
 *
 * Inserts are done calling our back-end endpoint with a POST call.
 * Users data is gotten through an AJAX call (REST).
 *
 * @author:   Daniele Gazzelloni / daniele@danielegazzelloni.com
 **/



var UserTable = React.createClass({

  // Initial state: sets table "th" and initialize table rows
  getInitialState: function() {

    return {
      headings: ["ID", "Name", "Age", "Email"]
    };

  },

  // Suddenly after rendering this component get users data
  componentDidMount: function() {

    var _self = this;

    $.get(this.props.source, function(result) {
      //_self.setProps({usersList: result.result});
      _self.props.usersList = result.result;
      _self.forceUpdate();
    });

  },

  // Render component (users table)
  render: function () {

    var _self = this;

    var thead = React.DOM.thead({},
      React.DOM.tr({},
        this.state.headings.map( function (heading) {
          return React.DOM.th({}, heading);
        })));

    var tbody = React.DOM.tbody({},
      this.props.usersList.map( function (user) {
        return React.DOM.tr({},
          _self.state.headings.map( function (heading) {
            return React.DOM.td({}, user[heading.toLowerCase()] || "");
          }));
      })
    );

    return React.DOM.table({className: "table"}, [thead, tbody]);
  }

});


// This is our "insert-a-new-user" form
var UsersForm = React.createClass({

  // Handles onSubmit event
  onSubmit: function(event) {

    event.preventDefault();

    var user = {};
    var _self = this;

    $.each($('#usersForm').serializeArray(), function(i, field) {
      user[field.name] = field.value;
    });


    $.post(this.props.action, user, function(result) {
      _self.props.handleUsersUpdate();
      $('#usersForm')[0].reset();
    });

  },

  // Render our "insert-a-new-user" form (divs, inputs and submit button)
  render: function () {

    return React.DOM.form( {
        onSubmit: this.onSubmit,
        id: "usersForm"
      },

      React.DOM.div( {className: "form-group"},
        React.DOM.label( {}, "Name:"),
        React.DOM.input( {className: "form-control", type: "text", name: "name", placeholder: "Alex Beagles", required: true}, null)
      ),

      React.DOM.div( {className: "form-group"},
        React.DOM.label( {}, "Age:"),
        React.DOM.input( {className: "form-control", type: "number", name: "age", placeholder: "0", required: true}, null)
      ),

      React.DOM.div( {className: "form-group"},
        React.DOM.label( {}, "Email:"),
        React.DOM.input( {className: "form-control", type: "text", name: "email", placeholder: "alex@abeagles.com"}, null)
      ),

      React.DOM.button( {className: "btn btn-primary", type: "submit"}, "Submit")
    );
  }

});



// Parent object container
var Users = React.createClass({

  handleUsersUpdate: function () {
    var _self = this;
    $.get(this.props.endpoint, function(result) {
      _self.props.usersList = result.result;
      _self.forceUpdate();
    });
  },

  render: function(){
    return React.DOM.div( {className: "row"},
      React.DOM.section({className: "col-md-4"},
        React.DOM.header({}, React.DOM.h2({}, "Insert a new user")),
        <UsersForm action={this.props.endpoint} handleUsersUpdate={this.handleUsersUpdate} />
        ),
      React.DOM.section({className: "col-md-8"},
        React.DOM.header({}, React.DOM.h2({}, "Users list")),
        <UserTable source={this.props.endpoint} usersList={this.props.usersList} />
        )
      );


  }
});


React.render(
  <Users endpoint={serverAddr+usersEP} usersList={[]} />,
  document.getElementById("usersDiv")
);