import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http"
import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/do'
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        if (req.headers.get('No-Auth') == "True") {
            return next.handle(req.clone())
        }

        if (localStorage.getItem('_to') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("x-access-token", localStorage.getItem('_to'))
            })
            return next.handle(clonedreq)
                .do(
                    succ => { },
                    err => {
                        if (err.status === 401)
                            this.router.navigateByUrl('/')
                    }
                )
        }
        else {
            this.router.navigateByUrl('/')
        }


    }
}