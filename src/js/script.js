const select = {
	template: '#template-book',
	bookList: '.books-list',
	linkToBook: 'a.book__image',
	sectionFilter: '.filters',
	bookRaiting: '.book__rating .book__rating__fill',
};

class BookList {
	constructor(){
		const thisBookList = this;
		thisBookList.favoriteBooks = [];
		thisBookList.filters = [];
		thisBookList.initData();
		thisBookList.getElements();
		thisBookList.render();
		thisBookList.addingToFavoritue();
		thisBookList.filterBooks();
	}
	initData(){
		const thisBookList = this;
		thisBookList.data = dataSource.books;
	}
	getElements(){
		const thisBookList = this;
		thisBookList.dom = {};
		thisBookList.templates = Handlebars.compile(document.querySelector(select.template).innerHTML);
		thisBookList.dom.booksContainer = document.querySelector(select.bookList);
		thisBookList.dom.formFilters = document.querySelector(select.sectionFilter);
	}
	render(){
		const thisBookList = this;

		for(let book of thisBookList.data){
			
			const htmlString = thisBookList.templates(book);
			
			const elementDOM = utils.createDOMFromHTML(htmlString);
			
			thisBookList.determineRatingBgc(elementDOM);
			
			thisBookList.dom.booksContainer.appendChild(elementDOM);
		}
	}
	addingToFavoritue(){
		const thisBookList = this;

		thisBookList.dom.booksContainer.addEventListener('dblclick', function(event){
				
			event.preventDefault(); 
					
				if(event.target.offsetParent.classList.contains('book__image')){
				
				const clickedBook = event.target.offsetParent; 
				const idBook = clickedBook.getAttribute('data-id');
				
				if(!thisBookList.favoriteBooks.includes(idBook)){
					thisBookList.favoriteBooks.push(idBook);
					clickedBook.classList.add('favorite'); 
				} else { 
					thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(idBook),1);
					clickedBook.classList.remove('favorite'); 
				}
			}
		});
	}
	filterBooks(){
		const thisBookList = this;

		thisBookList.dom.formFilters.addEventListener('click', function(event){
			
			if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
				
				const value = event.target.value; 
				
				if(event.target.checked){
					thisBookList.filters.push(value);
					thisBookList.hideBooks(value);
				} else {
					thisBookList.filters.splice(thisBookList.filters.indexOf(value),1);
					thisBookList.showBooks(value);
				}
			}
		});
	}
	hideBooks(arg){ 
		const thisBookList = this;

		for(let book of thisBookList.data){ 
			if(book.details[arg]) {
				const bookToHide = thisBookList.dom.booksContainer.querySelector('.book__image[data-id="'+ book.id +'"]');
				if(!bookToHide.classList.contains('hidden')) bookToHide.classList.add('hidden');
			}
	
		}
	}
	showBooks(arg){ 
		const thisBookList = this;

		for(let book of thisBookList.data){ 
			if(book.details[arg]) {
				const bookToShow = thisBookList.dom.booksContainer.querySelector('.book__image[data-id="'+ book.id +'"]');
				if(bookToShow.classList.contains('hidden')) bookToShow.classList.remove('hidden');
			}
	
		}
	}
	determineRatingBgc(elementDOM){
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
}
const app = new BookList();

