class Pagination {

    constructor(paginationComponent, pageSize, onShowPage) {
        this.paginationComponent = paginationComponent;
        this.pageSize = pageSize;
        this.pages = 0;
        this.currentPageIndex = 0;
        this.onShowPage = onShowPage;
    }

    setEntries(entries, showLastPage = true) {
        this.entries = entries;
        this.pages = Math.ceil(entries.length / this.pageSize);
        this._setupPagination(this.pages, entries);

        if (showLastPage) {
            this.currentPageIndex = this.pages - 1;
        } else {
            this.currentPageIndex = 0;
        }

        this._showPage(entries, this.currentPageIndex);
    }

    update() {
        if (this.entries) {
            this._showPage(this.entries, this.currentPageIndex);
        }
    }

    _showPage(entries, pageIndex) {
        const pageEntries = entries.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize - 1);
        this.currentPageIndex = pageIndex;

        this._setPaginationArrowStates(pageIndex);
        this._hideDispensableEntries(pageIndex);
        this._activatePaginationEntry(this.pageItems[pageIndex]);

        this.onShowPage(pageEntries);
    }

    _setupPagination(pages, entries) {
        this.paginationComponent.empty();
        this.pageItems = [];
        this.ellipsesItems = [];

        if (pages > 1) {
            const self = this;

            //Create "left arrow":
            this.previousItemEntry = jQuery(`<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>`);
            this.previousItemEntry.on('click', function (event) {
                event.preventDefault();
                if (self.currentPageIndex > 0) {
                    self._showPage(entries, self.currentPageIndex - 1);
                }
            });

            //Create "right arrow":
            this.nextItemEntry = jQuery(`<li class="page-item"><a class="page-link" href="javascript:void(0)">&raquo;</a></li>`);
            this.nextItemEntry.on('click', function (event) {
                event.preventDefault();
                if (self.currentPageIndex < self.pages - 1) {
                    self._showPage(entries, self.currentPageIndex + 1);
                }
            });

            this.paginationComponent.append(this.previousItemEntry);
            for (let pageIndex = 0; pageIndex < pages; pageIndex++) {
                const pageItem = jQuery(`<li class="page-item"><a class="page-link" href="javascript:void(0)">${pageIndex + 1}</a></li>`);
                this.paginationComponent.append(pageItem);
                this.pageItems.push(pageItem);
                pageItem.on('click', function (event) {
                    event.preventDefault();
                    self._showPage(entries, pageIndex);
                });

                if (pageIndex === 0 || pageIndex === pages - 2) {
                    //Add ellipses item after first page and before last page:
                    const ellipsesItem = jQuery('<li class="page-item"><a class="page-link" href="javascript:void(0)">...</a></li>');
                    ellipsesItem.addClass("disabled");
                    this.paginationComponent.append(ellipsesItem);
                    this.ellipsesItems.push(ellipsesItem);
                }
            }

            this.paginationComponent.append(this.nextItemEntry);
        }
    }

    _setPaginationArrowStates(pageIndex) {
        const previousItem = this.previousItemEntry;
        if (previousItem) {
            if (pageIndex == 0) {
                previousItem.addClass("disabled");
            } else {
                previousItem.removeClass("disabled");
            }
        }

        const nextItem = this.nextItemEntry;
        if (nextItem) {
            if (pageIndex === this.pages - 1) {
                nextItem.addClass("disabled");
            } else {
                nextItem.removeClass("disabled");
            }
        }
    }

    _activatePaginationEntry(paginationEntry) {
        this.paginationComponent.children().removeClass("active");
        if (paginationEntry) {
            paginationEntry.addClass("active");
        }
    }

    _hideDispensableEntries(pageIndex) {
        const countPageEntries = this.pageItems.length;
        this.pageItems.forEach(item => item.removeClass("d-none"));
        this.ellipsesItems.forEach(item => item.addClass("d-none"));

        const MAX_PAGE_ENTRIES = 7;
        if (countPageEntries > MAX_PAGE_ENTRIES) {
            //Hide all elements except arrows, first and last page, and pages "around" the current pageIndex:

            if (pageIndex - 1 > 1) {
                this.pageItems.slice(1, pageIndex - 1)
                    .forEach(item => item.addClass("d-none"));
                this.ellipsesItems[0].removeClass("d-none");
            }

            if (countPageEntries - 1 > pageIndex + 2) {
                this.pageItems.slice(pageIndex + 2, countPageEntries - 1)
                    .forEach(item => item.addClass("d-none"));
                this.ellipsesItems[1].removeClass("d-none");
            }
        }
    }
}