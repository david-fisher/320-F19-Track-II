//
//  ViewController.swift
//  iOSOrchardWatch
//
//  Created by Annabel Schneider on 11/7/19.
//  Copyright © 2019 Annabel Schneider. All rights reserved.
//

import UIKit

class ViewController: UIViewController{
    
    @IBAction func loginButton(_ sender: Any) {
        performSegue(withIdentifier: "login", sender: self)
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    
}

