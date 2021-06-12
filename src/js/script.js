const select = {
	template: '#template-book',
	bookList: '.books-list',
	linkToBook: 'a.book__image',
	sectionFilter: '.filters',
	bookRaiting: '.book__rating .book__rating__fill',
};
const templates = Handlebars.compile(document.querySelector(select.template).innerHTML);

const domTreeElements = {
	booksContainer: document.querySelector(select.bookList),
	formFilters: document.querySelector(select.sectionFilter),
};

const favoriteBooks = [];
const filters = [];

/* Funkcja, która przechodzi po wszystkich książkach z dataSource.books i renderuje dla nich reprezentacje HTML w liście .books-list. */
function render(){
	for(let book of dataSource.books){
		
		const htmlString = templates(book);
		
		const elementDOM = utils.createDOMFromHTML(htmlString);
		
		determineRatingBgc(elementDOM);
		
		const container = domTreeElements.booksContainer;
		
		container.appendChild(elementDOM);
	}
}
render();

/* Funkcjonalność umożliwiająca dodawanie książek do ulubionych oraz ich usuwanie z ulubionych*/
function addingToFavoritue(){
	
	domTreeElements.booksContainer.addEventListener('dblclick', function(event){
			
		event.preventDefault(); 
				
			if(event.target.offsetParent.classList.contains('book__image')){
			
			const clickedBook = event.target.offsetParent; 
			const idBook = clickedBook.getAttribute('data-id');
			
			if(!favoriteBooks.includes(idBook)){
				favoriteBooks.push(idBook);
				clickedBook.classList.add('favorite');
			} else { 
				favoriteBooks.splice(favoriteBooks.indexOf(idBook),1);
				clickedBook.classList.remove('favorite');
			}
		}
	});
}
addingToFavoritue();
/* Funkcjonalność umożliwiająca filtrowanie książek */
function filterBooks(){
	domTreeElements.formFilters.addEventListener('click', function(event){
		
		if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
			
			const value = event.target.value; 
			
			if(event.target.checked){
				filters.push(value);
				hideBooks(value);
			} else {
				filters.splice(filters.indexOf(value),1);
				showBooks(value);
			}
		}
	});
}
filterBooks();

function hideBooks(arg){
	for(let book of dataSource.books){ 
		if(book.details[arg]) {
			const bookToHide = domTreeElements.booksContainer.querySelector('.book__image[data-id="'+ book.id +'"]');
			if(!bookToHide.classList.contains('hidden')) bookToHide.classList.add('hidden');
		}

	}
}
function showBooks(arg){
	for(let book of dataSource.books){ 
		if(book.details[arg]) {
			const bookToShow = domTreeElements.booksContainer.querySelector('.book__image[data-id="'+ book.id +'"]');
			if(bookToShow.classList.contains('hidden')) bookToShow.classList.remove('hidden');
		}

	}
}
/*Funckcja dodająca style dotyczące paska rankingu */
function determineRatingBgc(elementDOM){
	const el = elementDOM.querySelector(select.bookRaiting);
	const raiting = Number.parseFloat(el.innerHTML.split('/')[0]);
		if(raiting < 6){
			el.style.background = "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
			el.style.width = (raiting * 10).toString() + '%';
		} else if(raiting >= 6 && raiting <= 8){
			el.style.background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
			el.style.width = (raiting * 10).toString() + '%';
		} else if(raiting > 8 && raiting <= 9){
			el.style.background = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
			el.style.width = (raiting * 10).toString() + '%';
		} else {
			el.style.background = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
			el.style.width = (raiting * 10).toString() + '%';
		}
}