import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Input() data = {
    "name": "Root",
    "children": [
      {
        "name": "L1 Child 1",
        "children": [
          {
            "name": "L2 Child 1",
            "children": [
              { "name": "L3 Child 1" },
              { "name": "L3 Child 2" },
              { "name": "L3 Child 3" },
              { "name": "L3 Child 4" }
            ]
          },
          { "name": "L2 Child 2" }
        ]
      },
      {
        "name": "L1 Child 2",
        "children": [
          {
            "name": "L2 Child 1",
            "children": [
              { "name": "L3 Child 1" },
              { "name": "L3 Child 2" },
              { "name": "L3 Child 3" }
            ]
          }]
      },
      {
        "name": "L1 Child 3",
        "children": [
          {
            "name": "L2 Child 1",
            "children": [
              { "name": "L3 Child 1" },
              { "name": "L3 Child 2" },
              { "name": "L3 Child 3" },
              { "name": "L3 Child 4" },
              { "name": "L3 Child 5" },
              { "name": "L3 Child 6" }
            ]
          }]
      }]
  };

  traversalOrder = [];
  nodeWidth = 100;
  nodeHeight = 30;
  canvasHeight;
  canvasWidth;
  constructor() { }

  traverse(node, level) {
    if (node == undefined) {
      return;
    }
    //console.log(node.name);

    this.traversalOrder.push({ name: node.name, level: level, parent: -1 });

    if (node.children == undefined) {
      return;
    }
    for (let i = 0; i < node.children.length; i++) {
      this.traverse(node.children[i], level + 1);
    }

  }

  findParent(i) {
    let level = this.traversalOrder[i].level;
    let parentLevel = -1;
    if (level == 0) {
      return -1;
    }

    for (let j = i - 1; j >= 0; j--) {
      if (this.traversalOrder[j].level == level - 1) {
        return j;
      }
    }

  }
  findAllParents() {

    for (let i = 0; i < this.traversalOrder.length; i++) {
      this.traversalOrder[i].parent = this.findParent(i);
    }
  }
  ngOnInit() {
    this.traverse(this.data, 0);
    this.findAllParents();
    this.canvasHeight = (this.traversalOrder.length + 1) * this.nodeHeight;
    let maxLevel = -1;

    for (let i = 0; i < this.traversalOrder.length; i++) {
      if (this.traversalOrder[i].level > maxLevel) {
        maxLevel = this.traversalOrder[i].level;
      }
    }

    this.canvasWidth = (maxLevel + 3) * this.nodeWidth;
  }

}
