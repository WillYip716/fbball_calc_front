import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { connect } from "react-redux";

class Rankings extends Component {
  state = {
    toggle: "average",
    ratcolumns: [
      {
        dataField: 'team',
        text: 'Team Name',
        sort: true
      },
      {
        dataField: 'PTS',
        text: 'PTS Rating',
        sort: true
      },
      {
        dataField: 'FG_PCT',
        text: 'FG% Rating',
        sort: true
      },
      {
        dataField: 'FT_PCT',
        text: 'FT% Rating',
        sort: true
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM Rating',
        sort: true
      },
      {
        dataField: 'REB',
        text: 'REB Rating',
        sort: true
      },
      {
        dataField: 'AST',
        text: 'AST Rating',
        sort: true
      },
      {
        dataField: 'STL',
        text: 'STL Rating',
        sort: true
      },
      {
        dataField: 'BLK',
        text: 'BLK Rating',
        sort: true
      },
      {
        dataField: 'TOV',
        text: 'TOV Rating',
        sort: true
      },
      {
        dataField: 'rottotal',
        text: 'Total',
        sort: true
      },
    ],
    rankcolumns: [
      {
        dataField: 'team',
        text: 'Team Name',
        sort: true
      },
      {
        dataField: 'PTS',
        text: 'PTS RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'FG_PCT',
        text: 'FG% RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'FT_PCT',
        text: 'FT% RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'REB',
        text: 'REB RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'AST',
        text: 'AST RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'STL',
        text: 'STL RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'BLK',
        text: 'BLK RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'TOV',
        text: 'TOV RNK',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
      {
        dataField: 'rottotal',
        text: 'Total',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return b - a;
          }
          return a - b; // desc
        }
      },
    ],
    columns: [
      {
        dataField: 'team',
        text: 'Team Name',
        sort: true
      },
      {
        dataField: 'PTS',
        text: 'PTS',
        sort: true
      },
      {
        dataField: 'FG_PCT',
        text: 'FG%',
        sort: true
      },
      {
        dataField: 'FT_PCT',
        text: 'FT%',
        sort: true
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM',
        sort: true
      },
      {
        dataField: 'REB',
        text: 'REB',
        sort: true
      },
      {
        dataField: 'AST',
        text: 'AST',
        sort: true
      },
      {
        dataField: 'STL',
        text: 'STL',
        sort: true
      },
      {
        dataField: 'BLK',
        text: 'BLK',
        sort: true
      },
      {
        dataField: 'TOV',
        text: 'TOV',
        sort: true
      },
    ]
  }

  changetog(val) {
    this.setState({
        toggle: val,
    })
  }
  
  render() {

    return (
      <div className="container">
        <h1>Rankings</h1>

        <ToggleButtonGroup type="radio" name="options" defaultValue="average" onChange={this.changetog.bind(this)}>
          <ToggleButton value="average" style={{padding: "5px",border: "black 1px solid"}}>Team Average</ToggleButton>
          <ToggleButton value="totalrating" style={{padding: "5px",border: "black 1px solid"}}>Team Total Ratings</ToggleButton>
          <ToggleButton value="avgrank" style={{padding: "5px", border: "black 1px solid"}}>Team Ranks</ToggleButton>
        </ToggleButtonGroup>
        <div className={this.state.toggle !== "average" ? 'hidden' : ''}>
            <h3>Team Average Stats </h3>
            {this.props.avg ?
                <BootstrapTable 
                striped
                hover
                keyField='team' 
                data={ this.props.avg } 
                columns={ this.state.columns }/>
                :<h3>nothing yet</h3>
            }   
        </div>
        <div className={this.state.toggle !== "totalrating" ? 'hidden' : ''}>
            <h3>Team Category Ratings Totals</h3>
            {this.props.tot ?
                <BootstrapTable 
                striped
                hover
                keyField='team' 
                data={ this.props.tr } 
                columns={ this.state.ratcolumns }/>
                :<h3>nothing yet</h3>
            }   
        </div>
        <div className={this.state.toggle !== "avgrank" ? 'hidden' : ''}>
            <h3>Rankings</h3>
            {this.props.avgrank ?
                <BootstrapTable 
                striped
                hover
                keyField='team' 
                data={ this.props.avgrank } 
                columns={ this.state.rankcolumns }/>
                :<h3>nothing yet</h3>
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avg: state.comp.rankings.avg,
    tot: state.comp.rankings.tot,
    avgrank: state.comp.rankings.rankavg,
    totrank: state.comp.rankings.ranktot,
    tr: state.comp.rankings.teamrat
  };
};


export default connect(
  mapStateToProps
)(Rankings);