const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        this.node = new Node();
        this.node.data = data;
        if (this.length == 0) {
            this._head = this.node;
            this._tail = this.node;
            this.node.prev = null;
            this.node.next = null;
        } else {
            this._tail.next = this.node;
            this._tail.prev = this._tail;
            this.node.prev = this._tail;
            this._tail = this.node; 
        };
        this.length++;

        return this;
    }

    head() {
        return this._head ?  this._head.data : null;
    }

    tail() {
        return this._tail ?  this._tail.data : null;
    }

    at(index) {
        return eval(this._getNode(index) + '.data');
    }

    _getNode(index) {
        let _accessPath = 'this._head'
        for (let i = 0; i < index; i++) {
            _accessPath += '.next';
        };
        return _accessPath;
    }

    insertAt(index, data) {
        let _nodeToBeAfter,
            _nodeToBeBefore,
            _newHead,
            _newTail;
        
        if (this.length == 0) {
            this.append(data);
            return this;
        };
        this.node = new Node(data);
        if ( index == 0 ) {
            _nodeToBeAfter = eval(this._getNode(index));
            this.node.next = _nodeToBeAfter;
            _nodeToBeAfter.prev = this.node;
            this._head = this.node;
        } else if (index == this.length) {
            this.append(data);
        } else {
            _nodeToBeAfter = eval(this._getNode(index));
            _nodeToBeBefore = eval(this._getNode(index-1));
            this.node.prev = _nodeToBeBefore;
            this.node.next = _nodeToBeAfter;
            _nodeToBeBefore.next = this.node;
            _nodeToBeAfter.prev = this.node;
        };
        this.length++;

        return this;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let _nodeAfter = eval(this._getNode(index + 1)),
            _nodeBefore = eval(this._getNode(index - 1));

        if (this.length <= 1) {
            this.clear();
            return this;
        };
        if (index == 0) {
            _nodeAfter.prev = null;
            this._head = _nodeAfter;
        } else if (index == this.length - 1) {
            _nodeBefore.next = null;
            this._tail = _nodeBefore;
        } else {
            _nodeBefore.next = _nodeAfter;
            _nodeAfter.prev = _nodeBefore;
            this.length--;
        };

        return this;
    }

    reverse() {
        let _nodeToWorkWith,
            _arrayOfNodes = [];

        if (this.length > 1) {
            for (let i = 0; i < this.length; i++) {
                _nodeToWorkWith = eval(this._getNode(i));
                _arrayOfNodes.push(_nodeToWorkWith);
            };
            for (let i = 0; i < _arrayOfNodes.length; i++) {
                _arrayOfNodes[i].next = _arrayOfNodes[i-1] || null;
                _arrayOfNodes[i].prev = _arrayOfNodes[i+1] || null;
            };
            this._head = _arrayOfNodes[_arrayOfNodes.length-1];
            this._tail = _arrayOfNodes[0];
            _arrayOfNodes = [];
        };
            
        return this;
    }

    indexOf(data) {
        let _dataCandidate;
        for (let i = 0; i < this.length; i++) {
            _dataCandidate = eval(this._getNode(i) + '.data');
            if (_dataCandidate == data) {
                return i;
            };
        };
        return -1;
    }
}

module.exports = LinkedList;