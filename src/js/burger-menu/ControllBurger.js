export default class ControllBurger {
    constructor(d) {
        this.d = d;

        this.click = this.click.bind(this);
        this.change = this.change.bind(this);
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        this.d.switcher.addEventListener('change', this.change);

        [...this.d.boxes].forEach(checkbox => {
            checkbox.addEventListener('change', this.change)
        });
    }

    click(e) {

    }

    change(e) {
        // Открытие - закрытие меню 
        if(e.target.closest('.' + this.d.params.switcherCheckboxClass)) {
            const res = this.d.switcher.checked;
            this.d.controllNav(res);

            return;
        }

        if(e.target.closest('.burger__first-level')) {
            const checkbox = e.target;
            this.d.controllSecond(checkbox);
        }

        if(e.target.closest('.burger__second-level')) {
            const checkbox = e.target;
            this.d.controllThird(checkbox);
        }
    }
}