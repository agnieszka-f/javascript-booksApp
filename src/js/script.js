const select = {
	template: '#template-book',
	bookList: '.books-list',
	linkToBook: 'a.book__image',
};
const templates = Handlebars.compile(document.querySelector(select.template).innerHTML);

const domTreeElements = {
	booksContainer: document.querySelector(select.bookList),
};

const favoriteBooks = [];

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
