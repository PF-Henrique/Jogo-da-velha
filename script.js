var count, boardHeight, boardWidth, playerWon, computerWon,
	player, computer, pMoves, cMoves, player;
var WINS = {

	top: [1, 2, 3],
	midH: [4, 5, 6],
	bot: [7, 8, 9],


	left: [1, 4, 7],
	center: [2, 5, 8],
	right: [3, 6, 9],


	topBot: [1, 5, 9],
	botTop: [7, 5, 3]
}
$(document).ready(function () {

	$('.cell').each(function (index) {
		$(this).attr('id', 'cell-' + (index + 1));
	});
	$('button').click(function () {
		startGame($(this).text().toLowerCase());
	});
});
function startGame(symbol) {

	count = 1;
	boardHeight = boardWidth = 0;
	playerWon = computerWon = false;
	pMoves = [];
	cMoves = [1];

	player = symbol;
	computer = player === 'x' ? 'o' : 'x';

	(function () {
		$('button').fadeOut(50);
		$('h2').fadeOut(50);
		$('.prompt').animate({
			width: '100%',
			height: '100%'
		}, {
			duration: 300,
			complete: function () {
				$('.prompt').fadeOut(500);
				$('body').css('background-color', '#ddd');
				$('h1').css('color', '#333');
				$('.cell').css('cursor', 'pointer');
				$('.board').css('opacity', 1);
				$('#cell-1').text(computer);
			}
		});

		$('.cell').on('click', function () {
			makeMoves($(this));
		});
	})();
}
function makeMoves(pos) {
	var playerMove = parseInt(pos.attr('id').substr(5, 6));
	if (pos.text().charCodeAt(0) === 160) {
		$.when(
			pMoves.push(playerMove),
			pos.text(player),
			count++
		).then(function () {
			count++;
			var cPos = getAI();
			cMoves.push(cPos);
			$('#cell-' + cPos).text(computer);

			playerWon = winCheck(pMoves);
			computerWon = winCheck(cMoves);
		});
	}
	if (playerWon) {
		setTimeout(function () {
			alert('você venceu parabéns :) Vamos dnv!');
			reset();
		}, 300);

	} else if (computerWon) {
		setTimeout(function () {
			alert('Que pena você perdeu :(  Vamos dnv!');
			reset();
		}, 300);

	} else if (count > 7) {
		setTimeout(function () {
			reset();
			alert('Ih Deu velha :( Vamos dnv');
		}, 300);

	}
}
function getAI() {

	function chk(movesArr, x, y, z) {
		return (
			movesArr.indexOf(x) >= 0 &&
			movesArr.indexOf(y) >= 0 &&
			movesArr.indexOf(z) < 0 &&
			$('#cell-' + z).text().charCodeAt(0) === 160);
	};
	console.log(cMoves);

	for (var win in WINS) {
		var one = WINS[win][0],
			two = WINS[win][1],
			three = WINS[win][2];


		if (count <= 3) {
			if ($('#cell-9').text().charCodeAt(0) === 160) return 9;
			else if ($('#cell-7').text().charCodeAt(0) == 160) return 7;
		}

		if (chk(cMoves, three, two, one)) return one;
		else if (chk(cMoves, one, three, two)) return two;
		else if (chk(cMoves, two, one, three)) return three;
		else if (!chk(cMoves, three, two, one) && !chk(cMoves, one, three, two) && !chk(cMoves, two, one, three)) {
			if (chk(pMoves, three, two, one)) return one;
			else if (chk(pMoves, one, three, two)) return two;
			else if (chk(pMoves, two, one, three)) return three;
		}
	}
}
function winCheck(owner) {
	for (var win in WINS) {
		if (owner.indexOf(WINS[win][0]) >= 0 &&
			owner.indexOf(WINS[win][1]) >= 0 &&
			owner.indexOf(WINS[win][2]) >= 0) {
			return true;
		}
	}
	return false;
}
function reset() {
	$('button').fadeIn(50);
	$('h2').fadeIn(50);
	$('.prompt').animate({
		width: $(document).width() > 410 ? '400px' : '400px',
		height: $(document).width() > 410 ? '300px' : '300px'
	}, {
		duration: 300,
		complete: function () {
			$('.prompt').fadeIn(500);
			$('body').css('background-color', '#ededed');
			$('h2-red').css('color', '#000000');
			$('.cell').css('cursor', 'default');
			$('.board').css('opacity', 0);
			$('.cell').each(function () {
				$(this).html('&nbsp');
				$(this).off('click');
			});


		}
	});
}