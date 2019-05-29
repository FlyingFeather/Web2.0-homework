$(function() {
	initialPuzzlePane();
	initialButton();
	changePicClickNumber = 0;
	$('#resum').click(function (){PuzzlePane.recover();});
	$('#sourcepic').click(function() {$('#pic1').removeClass('notshow');$('#pic1').addClass('show');})
	//$('#changepic').click(function() {changePicClickNumber++;changeBackgroundPicture()});
	$('#changepic').click(function() {changePicClickNumber++;
		//console.log(changePicClickNumber);
		changeBackgroundPicture();
	});
});

var initialPuzzlePane = function() {
	count = 0; start = false; changePicClickNumber = 0;
	$('#puzzle-pane div').each(function(){PuzzlePane.tiles.push(new Tile(this));});
	$('#puzzle-pane').click(function(event){
		tile = PuzzlePane.getTile(event.target);
		if (tile && tile.canMove && start) {
			tile.move(PuzzlePane.blankPosition);
			PuzzlePane.updateTilesMovability();
			if (PuzzlePane.isSolved()) {
				var string = '恭喜\n' + '一共走了：' + count + '步'; alert(string); count = 0;
			}
		}
	});
}

var Tile = function(pale) {
	this.dom = $(pale);
	this.size = parseInt(this.dom.css('width'));
	this.index = parseInt(this.dom.attr('id'));
	this.setPosition(this.index);
	this.dom.css('background-position', -this.xOffset + 'px ' + -this.yOffset + 'px');
	this.canMove = this.index == 12 || this.index == 15;
}

Tile.prototype.setPosition = function(position) {
	this.row = Math.ceil(position/4);
	this.column = position%4 || 4;
	this.xOffset = (this.column-1)*this.size;
	this.yOffset = (this.row-1)*this.size;
	this.dom.css('top', this.yOffset);
	this.dom.css('left', this.xOffset);
	this.position = position;
}

Tile.prototype.move = function(position) {
	count++;
	var stepnumbershow = "Step:"+count;
	$('#stepnumber').text(stepnumbershow);
	PuzzlePane.setBlankBlockPosition(this.position);
	this.setPosition(position);
}

PuzzlePane = {
	tiles: [],
	blankPosition: 16,
	positions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],

	setBlankBlockPosition: function(position) {
		this.blankPosition = position;
		this.blankInRow = Math.ceil(position/4);
		this.blankInColumn = position%4 || 4;
	},

	updateTilesMovability: function() {
		this.tiles.forEach(function(tile){
			tile.canMove = PuzzlePane.isNeighborOfBlank(tile);
		});
	},

	isNeighborOfBlank: function(tile) {
		return (tile.row == this.blankInRow && (tile.column-this.blankInColumn == 1 || tile.column-this.blankInColumn == -1)
			|| (tile.column == this.blankInColumn && (tile.row-this.blankInRow == 1 || tile.row-this.blankInRow == -1)));
	},

	getTile: function(dom) {
		result = this.tiles.filter(function(tile) {
			return tile.dom[0] == $(dom)[0];
		});
		return result[0];
	},

	shuffleTiles: function() {
		start = true; count = 0;
		$('#pic1').removeClass('show'); $('#pic1').addClass('notshow');
		$('#stepnumber').text('Step:0');
		$('#restart').text('重开');
		this.shufflePosition();
		for (var i = 0; i < 15; i++) {
			this.tiles[i].setPosition(this.positions[i]);
		}
		this.setBlankBlockPosition(this.positions[15]);
		this.updateTilesMovability();
	},

	shufflePosition: function() {
		do {
			this.positions.sort(function(){return 0.5-Math.random();});
		} while (!this.isSolvable())
	},

	isSolvable: function() {
		this.reverseCount = 0;
		for (var i = 0; i < 16; i++) {
			for (var j = i; j < 16; j++) {
				if (this.positions[i] > this.positions[j]) {
					this.reverseCount++;
				}
			}
		}
		return this.reverseCount%2 === 0;
	},

	isSolved: function() {
		return this.tiles.map(function(tile) {
			return tile.index == tile.position;
		}).reduce(function(a, b){
			return a && b;
		});
	},

	recover: function() {
		for (var i = 0; i < 15; i++) {
			this.tiles[i].setPosition(i+1);
		}
		this.setBlankBlockPosition(16);
		this.updateTilesMovability();
		$('#stepnumber').text('Step:0');
		start = false;
		$('#restart').text('开始');
	}
}

initialButton = function() {
	$('#restart').click(PuzzlePane.shuffleTiles.bind(PuzzlePane));
}
// 换图
changeBackgroundPicture = function() {
	if (start) PuzzlePane.recover();
	if (changePicClickNumber % 3 == 1) {
		$('#puzzle-pane div, #pic1').removeClass('backgroundImage3');
		$('#puzzle-pane div, #pic1').addClass('backgroundImage1');
	}
	if (changePicClickNumber % 3 == 2) {
		$('#puzzle-pane div, #pic1').removeClass('backgroundImage1');
		$('#puzzle-pane div, #pic1').addClass('backgroundImage2');
	}
	if (changePicClickNumber % 3 == 0) {
		$('#puzzle-pane div, #pic1').removeClass('backgroundImage2');
		$('#puzzle-pane div, #pic1').addClass('backgroundImage3');
	}
}
