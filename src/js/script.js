const select = {
	template: '#template-book',
	bookList: '.books-list',
	linkToBook: 'a.book__image',
	sectionFilter: '.filters',
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
	domTreeElements.formFilters.addEventListener('click', function(){
		
		if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
			
			const value = event.target.value;
			
			if(event.target.checked){
				filters.push(value); 
			} else {
				filters.splice(filters.indexOf(value),1); 
			}
		}
	});
}
filterBooks();