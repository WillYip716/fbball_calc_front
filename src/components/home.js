import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button,Form } from "react-bootstrap";
import { connect } from "react-redux";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert'


class Home extends Component {
  state = {
    pguards: [],
    sguards: [],
    sforwards: [],
    pforwards: [],
    centers: [],
    all: [],
    avglist:[],
    av: "all",
    tar:"",
    sfil:[],
    pos: "all",
    ptsmin:0,
    fgmin:0,
    threemin:0,
    ftmin:0,
    rebmin:0,
    astmin:0,
    stlmin:0,
    blkmin:0,
    invalidfilters:false,
    columnsavg: [
      {
        dataField: 'Player_Name',
        text: 'Name',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'Pos',
        text: 'Pos.',
        sort: true
      },
      {
        dataField: 'GP',
        text: 'GP',
        sort: true
      },
      {
        dataField: 'TotalRating',
        text: 'Rating',
        sort: true,
      },
      {
        dataField: 'PTS',
        text: 'PTS',
        sort: true
      },
      {
        dataField: 'FGM',
        text: 'FGM',
        sort: true
      },
      {
        dataField: 'FGA',
        text: 'FGA',
        sort: true
      },
      {
        dataField: 'FG_PCT',
        text: 'FG%',
        sort: true
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM',
        sort: true
      },
      {
        dataField: 'FTM',
        text: 'FTM',
        sort: true
      },
      {
        dataField: 'FTA',
        text: 'FTA',
        sort: true
      },
      {
        dataField: 'FT_PCT',
        text: 'FT%',
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
    ],
    columns: [
      {
        dataField: 'Player_Name',
        text: 'Name',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'Pos',
        text: 'Pos.',
        sort: true
      },
      {
        dataField: 'GP',
        text: 'GP',
        sort: true
      },
      {
        dataField: 'TotalRatingEdited',
        text: 'Rating',
        sort: true
      },
      {
        dataField: 'PTSrt',
        text: 'PTS',
        sort: true,
        hidden: false
      },
      {
        dataField: 'FG_PCTrt',
        text: 'FG%',
        sort: true,
        hidden: false
      }, 
      {
        dataField: 'FG3Mrt',
        text: '3PTM',
        sort: true,
        hidden: false
      },
      {
        dataField: 'FT_PCTrt',
        text: 'FT%',
        sort: true,
        hidden: false
      },
      {
        dataField: 'REBrt',
        text: 'REB',
        sort: true,
        hidden: false
      },
      {
        dataField: 'ASTrt',
        text: 'AST',
        sort: true,
        hidden: false
      },
      {
        dataField: 'STLrt',
        text: 'STL',
        sort: true,
        hidden: false
      },
      {
        dataField: 'BLKrt',
        text: 'BLK',
        sort: true,
        hidden: false
      },
      {
        dataField: 'TOVrt',
        text: 'TOV',
        sort: true,
        hidden: false
      },
    ],
    columnsbase: [
      {
        dataField: 'Player_Name',
        text: 'Name',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'Pos',
        text: 'Pos.',
        sort: true
      },
      {
        dataField: 'GP',
        text: 'GP',
        sort: true
      },
      {
        dataField: 'TotalRatingEdited',
        text: 'Rating',
        sort: true
      },
      {
        dataField: 'PTSrt',
        text: 'PTS',
        sort: true,
        hidden: false
      },
      {
        dataField: 'FG_PCTrt',
        text: 'FG%',
        sort: true,
        hidden: false
      }, 
      {
        dataField: 'FG3Mrt',
        text: '3PTM',
        sort: true,
        hidden: false
      },
      {
        dataField: 'FT_PCTrt',
        text: 'FT%',
        sort: true,
        hidden: false
      },
      {
        dataField: 'REBrt',
        text: 'REB',
        sort: true,
        hidden: false
      },
      {
        dataField: 'ASTrt',
        text: 'AST',
        sort: true,
        hidden: false
      },
      {
        dataField: 'STLrt',
        text: 'STL',
        sort: true,
        hidden: false
      },
      {
        dataField: 'BLKrt',
        text: 'BLK',
        sort: true,
        hidden: false
      },
      {
        dataField: 'TOVrt',
        text: 'TOV',
        sort: true,
        hidden: false
      },
    ]
  }

  componentDidMount() {
    if(this.props.aratings){
      const updatedpg = this.props.pgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedsg = this.props.sgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedsf = this.props.sfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedpf = this.props.pfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedc = this.props.cratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updateda = this.props.aratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const avg = this.props.aratings.slice().sort((a,b) => (a.TotalRating > b.TotalRating) ? -1 : ((b.TotalRating > a.TotalRating) ? 1 : 0));
      this.setState({
          pguards: updatedpg,
          sguards: updatedsg,
          sforwards: updatedsf,
          pforwards: updatedpf,
          centers: updatedc,
          all: updateda,
          avglist: avg,
      })
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.aratings !== this.props.aratings){
      if(this.props.aratings.length){
        const updatedpg = this.props.pgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updatedsg = this.props.sgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updatedsf = this.props.sfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updatedpf = this.props.pfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updatedc = this.props.cratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updateda = this.props.aratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const avg = this.props.aratings.slice().sort((a,b) => (a.TotalRating > b.TotalRating) ? -1 : ((b.TotalRating > a.TotalRating) ? 1 : 0));
        this.setState({
            pguards: updatedpg,
            sguards: updatedsg,
            sforwards: updatedsf,
            pforwards: updatedpf,
            centers: updatedc,
            all: updateda,
            avglist: avg,
        })
      }
    }
  }



  
  avtog(val) {
    this.setState({
        av: val,
    })
  }

  ptog(val) {
    this.setState({
        pos: val,
    })
  }

  statstog(val) {
    this.setState({
        sfil: val,
    })
  }

  togglear(val) {
    if(this.props.aratings){
      const updatedpg = this.props.pgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedsg = this.props.sgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedsf = this.props.sfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedpf = this.props.pfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedc = this.props.cratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updateda = this.props.aratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const avg = this.props.aratings.slice().sort((a,b) => (a.TotalRating > b.TotalRating) ? -1 : ((b.TotalRating > a.TotalRating) ? 1 : 0));
      this.setState({
          pguards: updatedpg,
          sguards: updatedsg,
          sforwards: updatedsf,
          pforwards: updatedpf,
          centers: updatedc,
          all: updateda,
          avglist: avg,
          av: "all",
          tar:val,
          sfil:[],
          pos: "all",
          ptsmin:0,
          fgmin:0,
          threemin:0,
          ftmin:0,
          rebmin:0,
          astmin:0,
          stlmin:0,
          blkmin:0,
          invalidfilters:false,
          columnsavg: [
            {
              dataField: 'Player_Name',
              text: 'Name',
              sort: true,
              filter: textFilter()
            },
            {
              dataField: 'Pos',
              text: 'Pos.',
              sort: true
            },
            {
              dataField: 'GP',
              text: 'GP',
              sort: true
            },
            {
              dataField: 'TotalRating',
              text: 'Rating',
              sort: true,
            },
            {
              dataField: 'PTS',
              text: 'PTS',
              sort: true
            },
            {
              dataField: 'FGM',
              text: 'FGM',
              sort: true
            },
            {
              dataField: 'FGA',
              text: 'FGA',
              sort: true
            },
            {
              dataField: 'FG_PCT',
              text: 'FG%',
              sort: true
            }, 
            {
              dataField: 'FG3M',
              text: '3PTM',
              sort: true
            },
            {
              dataField: 'FTM',
              text: 'FTM',
              sort: true
            },
            {
              dataField: 'FTA',
              text: 'FTA',
              sort: true
            },
            {
              dataField: 'FT_PCT',
              text: 'FT%',
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
          ],
          columns: [
            {
              dataField: 'Player_Name',
              text: 'Name',
              sort: true,
              filter: textFilter()
            },
            {
              dataField: 'Pos',
              text: 'Pos.',
              sort: true
            },
            {
              dataField: 'GP',
              text: 'GP',
              sort: true
            },
            {
              dataField: 'TotalRatingEdited',
              text: 'Rating',
              sort: true
            },
            {
              dataField: 'PTSrt',
              text: 'PTS',
              sort: true,
              hidden: false
            },
            {
              dataField: 'FG_PCTrt',
              text: 'FG%',
              sort: true,
              hidden: false
            }, 
            {
              dataField: 'FG3Mrt',
              text: '3PTM',
              sort: true,
              hidden: false
            },
            {
              dataField: 'FT_PCTrt',
              text: 'FT%',
              sort: true,
              hidden: false
            },
            {
              dataField: 'REBrt',
              text: 'REB',
              sort: true,
              hidden: false
            },
            {
              dataField: 'ASTrt',
              text: 'AST',
              sort: true,
              hidden: false
            },
            {
              dataField: 'STLrt',
              text: 'STL',
              sort: true,
              hidden: false
            },
            {
              dataField: 'BLKrt',
              text: 'BLK',
              sort: true,
              hidden: false
            },
            {
              dataField: 'TOVrt',
              text: 'TOV',
              sort: true,
              hidden: false
            },
          ],
          columnsbase: [
            {
              dataField: 'Player_Name',
              text: 'Name',
              sort: true,
              filter: textFilter()
            },
            {
              dataField: 'Pos',
              text: 'Pos.',
              sort: true
            },
            {
              dataField: 'GP',
              text: 'GP',
              sort: true
            },
            {
              dataField: 'TotalRatingEdited',
              text: 'Rating',
              sort: true
            },
            {
              dataField: 'PTSrt',
              text: 'PTS',
              sort: true,
              hidden: false
            },
            {
              dataField: 'FG_PCTrt',
              text: 'FG%',
              sort: true,
              hidden: false
            }, 
            {
              dataField: 'FG3Mrt',
              text: '3PTM',
              sort: true,
              hidden: false
            },
            {
              dataField: 'FT_PCTrt',
              text: 'FT%',
              sort: true,
              hidden: false
            },
            {
              dataField: 'REBrt',
              text: 'REB',
              sort: true,
              hidden: false
            },
            {
              dataField: 'ASTrt',
              text: 'AST',
              sort: true,
              hidden: false
            },
            {
              dataField: 'STLrt',
              text: 'STL',
              sort: true,
              hidden: false
            },
            {
              dataField: 'BLKrt',
              text: 'BLK',
              sort: true,
              hidden: false
            },
            {
              dataField: 'TOVrt',
              text: 'TOV',
              sort: true,
              hidden: false
            },
          ]
      })
    }
  }

  setFilVal(val,event){
    if(event.target.value === ""){
      this.setState({
        [val]: "0"
      })
    }
    else{
      this.setState({
        [val]: event.target.value
      })
    }
  }


  filTotal = (o) => {    
    let total = 0;
    let filtot = 0;
    let u = ["PTSrt","FG_PCTrt","FG3Mrt","FT_PCTrt","REBrt","ASTrt","STLrt","BLKrt","TOVrt"];
    for(let j=0;j<u.length;j++){
      total += o[u[j]];
    }
    if(this.state.sfil.length){
      const keys = this.state.sfil;
      for(let i=0;i<keys.length;i++){
        filtot += o[keys[i]];
      }
    }
    return Math.round((total - filtot)* 100)/100;
  }


  filterInfo(event){
      event.preventDefault();
      //let u = ["PTSrt","FG_PCTrt","FG3Mrt","FT_PCTrt","REBrt","ASTrt","STLrt","BLKrt","TOVrt"];
      const newColumn = this.state.columnsbase.filter(element => this.state.sfil.indexOf(element.dataField) === -1);
      if(this.state.av === "available"){
          const rostered = this.props.teams.reduce((a, c) => a.concat(c["players"]),[])
          
          const updatedpg = this.props.pgratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedsg = this.props.sgratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedsf = this.props.sfratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedpf = this.props.pfratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedc = this.props.cratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updateda = this.props.aratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          
          this.setState({
              columns:newColumn,
              pguards: updatedpg,
              sguards: updatedsg,
              sforwards: updatedsf,
              pforwards: updatedpf,
              centers: updatedc,
              all: updateda,
          });
      }else{
          const updatedpg = this.props.pgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedsg = this.props.sgratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedsf = this.props.sfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedpf = this.props.pfratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedc = this.props.cratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updateda = this.props.aratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));

          this.setState({
            columns:newColumn,
            pguards: updatedpg,
            sguards: updatedsg,
            sforwards: updatedsf,
            pforwards: updatedpf,
            centers: updatedc,
            all: updateda,
          });
      }
  }

  filterval(event){
      const pts = parseFloat(this.state.ptsmin);
      const fg = parseFloat(this.state.fgmin);
      const threes = parseFloat(this.state.threemin);
      const ft = parseFloat(this.state.ftmin);
      const reb = parseFloat(this.state.rebmin);
      const ast = parseFloat(this.state.astmin);
      const stl = parseFloat(this.state.stlmin);
      const blk = parseFloat(this.state.blkmin);
      console.log(pts + " " + fg + " " + threes+ " " + ft+ " " + reb+ " " + ast+ " " + stl+ " " + blk)
      if(!isNaN(this.state.ptsmin)&&!isNaN(this.state.fgmin)&&!isNaN(this.state.threemin)&&!isNaN(this.state.ftmin)&&!isNaN(this.state.rebmin)&&!isNaN(this.state.astmin)&&!isNaN(this.state.stlmin)&&!isNaN(this.state.blkmin)){
          const filteredplayers = this.props.aratings.filter(r => r.PTS >= pts && r.FG_PCT >= fg && r.FG3M >= threes && r.FT_PCT >= ft && r.REB >= reb && r.AST >= ast && r.STL >= stl && r.BLK >= blk)
          this.setState({
            avglist: filteredplayers,
            invalidfilters: false
          })
      }
      else{
        this.setState({
          invalidfilters: true
        })
      }
  }

  
  render() {

    return (
      
      <div className="container">
        {this.state.all.length?
          <ToggleButtonGroup type="radio" name="options" defaultValue="" onChange={this.togglear.bind(this)}>
            <ToggleButton value={this.state.tar?"":"ratings"} style={{padding: "5px",border: "black 1px solid"}}>{this.state.tar?"Toggle: Ratings":"Toggle: Avg"}</ToggleButton>
          </ToggleButtonGroup>
          :<h5>No data at the moment. Head over to the compile section to load your leagues info. Data might take some time to load</h5>
        }

        {(this.props.compilestate === "loading")?<Alert key="loading" variant="primary">Loading...</Alert>:<div/>}
        {(this.props.compilestate === "error")?<Alert key="errormsg" variant="danger">Request failed</Alert>:<div/>}
        

        {this.state.tar !== "ratings" &&  this.state.all.length ?
          <div>
            <h1>All Players</h1>
            <InputGroup className="mb-3" >
              <InputGroup.Prepend>
                <InputGroup.Text id="PTS">PTS>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="PTS"
                aria-describedby="PTS"
                isInvalid = {isNaN(this.state.ptsmin)}
                onChange={this.setFilVal.bind(this,"ptsmin")}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="FG">FG%>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="FG"
                aria-describedby="FG"
                isInvalid = {isNaN(this.state.fgmin)}
                onChange={this.setFilVal.bind(this,"fgmin")}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="3PTM">3PTM>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="3PTM"
                aria-describedby="3PTM"
                isInvalid = {isNaN(this.state.threemin)}
                onChange={this.setFilVal.bind(this,"threemin")}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="FT">FT%>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="FT"
                aria-describedby="FT"
                isInvalid = {isNaN(this.state.ftmin)}
                onChange={this.setFilVal.bind(this,"ftmin")}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="REB">REB>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="REB"
                aria-describedby="REB"
                isInvalid = {isNaN(this.state.rebmin)}
                onChange={this.setFilVal.bind(this,"rebmin")}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="AST">AST>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="AST"
                aria-describedby="AST"
                isInvalid = {isNaN(this.state.astmin)}
                onChange={this.setFilVal.bind(this,"astmin")}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="STL">STL>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="STL"
                aria-describedby="STL"
                isInvalid = {isNaN(this.state.stlmin)}
                onChange={this.setFilVal.bind(this,"stlmin")}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="BLK">BLK>=</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="string"
                placeholder="0"
                aria-label="BLK"
                aria-describedby="BLK"
                isInvalid = {isNaN(this.state.blkmin)}
                onChange={this.setFilVal.bind(this,"blkmin")}
              />
              <Button type="submit" style={{backgroundColor: "gray",border: "black 1px solid"}} onClick={this.filterval.bind(this)}>Filter</Button>
            </InputGroup>
            {this.state.invalidfilters?<Alert key="errormsg" variant="danger">Invalid input, please make sure all filter values are number</Alert>:<div/>}
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.avglist } 
            columns={ this.state.columnsavg }
            pagination={ paginationFactory() }
            filter={ filterFactory() }
            />
          </div> 
          :<div/>
        }

        {this.state.tar === "ratings" && this.state.all.length?
          <div>
            <h1>Players Ratings</h1>
            <ToggleButtonGroup type="radio" name="options" defaultValue="all" onChange={this.ptog.bind(this)}>
              <ToggleButton value="all" style={{padding: "5px",border: "black 1px solid"}}>All</ToggleButton>
              <ToggleButton value="pguards" style={{padding: "5px", border: "black 1px solid"}}>Point Guards</ToggleButton>
              <ToggleButton value="sguards" style={{padding: "5px", border: "black 1px solid"}}>Shooting Guards</ToggleButton>
              <ToggleButton value="sforwards" style={{padding: "5px", border: "black 1px solid"}}>Small Forwards</ToggleButton>
              <ToggleButton value="pforwards" style={{padding: "5px", border: "black 1px solid"}}>Power Forwards</ToggleButton>
              <ToggleButton value="centers" style={{padding: "5px", border: "black 1px solid"}}>Centers</ToggleButton>
            </ToggleButtonGroup>
            <br/>
            <ToggleButtonGroup type="checkbox" onChange={this.statstog.bind(this)} >
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="PTSrt">PTS</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FG_PCTrt">FG%</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FG3Mrt">3PTM</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FT_PCTrt">FT%</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="REBrt">REB</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="ASTrt">AST</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="STLrt">STL</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="BLKrt">BLK</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="TOVrt">TOV</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup type="radio" name="availoptions" onChange={this.avtog.bind(this)} defaultValue="all">
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="all">All</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="available">Available</ToggleButton>
            </ToggleButtonGroup>
            <Form onSubmit={this.filterInfo.bind(this)} role="form">
              <Button style={{backgroundColor: "gray",border: "black 1px solid"}} type="submit">Filter</Button>
            </Form>
            <div className={this.state.pos !== "all" ? 'hidden' : ''}>
                <h3>All Players Ratings</h3>
                {this.state.all ?
                  <BootstrapTable 
                  striped
                  hover
                  keyField='id' 
                  data={ this.state.all } 
                  columns={ this.state.columns }
                  pagination={ paginationFactory() }
                  filter={ filterFactory() }
                  />
                  :<h5>loading or no compiled data</h5>
                }
            </div>
            <div className={this.state.pos !== "pguards" ? 'hidden' : ''}>
                <h3>Point Guards Relative Ratings</h3>
                {this.state.pguards ?
                  <BootstrapTable 
                  striped
                  hover
                  keyField='id' 
                  data={ this.state.pguards } 
                  columns={ this.state.columns }
                  pagination={ paginationFactory() }
                  filter={ filterFactory() }
                  />
                  :<h5>loading or no compiled data. </h5>
                }
            </div>
            <div className={this.state.pos !== "sguards" ? 'hidden' : ''}>
                <h3>Guards Relative Ratings</h3>
                {this.state.sguards ?
                  <BootstrapTable 
                  striped
                  hover
                  keyField='id' 
                  data={ this.state.sguards } 
                  columns={ this.state.columns }
                  pagination={ paginationFactory() }
                  filter={ filterFactory() }
                  />
                  :<h5>loading or no compiled data. </h5>
                }
            </div>
            <div className={this.state.pos !== "sforwards" ? 'hidden' : ''}>
                <h3>Forwards Relative Ratings</h3>
                {this.state.sforwards ?
                  <BootstrapTable 
                  striped
                  hover
                  keyField='id' 
                  data={ this.state.sforwards } 
                  columns={ this.state.columns }
                  pagination={ paginationFactory() }
                  filter={ filterFactory() }/>
                  :<h5>loading or no compiled data</h5>
                }
            </div>
            <div className={this.state.pos !== "pforwards" ? 'hidden' : ''}>
                <h3>Forwards Relative Ratings</h3>
                {this.state.pforwards ?
                  <BootstrapTable 
                  striped
                  hover
                  keyField='id' 
                  data={ this.state.pforwards } 
                  columns={ this.state.columns }
                  pagination={ paginationFactory() }
                  filter={ filterFactory() }/>
                  :<h5>loading or no compiled data</h5>
                }
            </div>
            <div className={this.state.pos !== "centers" ? 'hidden' : ''}>
                <h3>Centers Relative Ratings</h3>
                {this.state.centers ?
                  <BootstrapTable 
                  striped
                  hover
                  keyField='id' 
                  data={ this.state.centers } 
                  columns={ this.state.columns }
                  pagination={ paginationFactory() }
                  filter={ filterFactory() }
                  />
                  :<h5>loading or no compiled data</h5>
                }
            </div>
          </div>
          :<div/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pgratings: state.comp.ratings.pguards,
    sgratings: state.comp.ratings.sguards,
    sfratings: state.comp.ratings.sforwards,
    pfratings: state.comp.ratings.pforwards,
    cratings: state.comp.ratings.centers,
    aratings: state.comp.ratings.all,
    teams: state.comp.teams,
    compilestate: state.comp.process,
  };
};


export default connect(
  mapStateToProps
)(Home);