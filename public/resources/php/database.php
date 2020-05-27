<?php 
include_once("config.php");
Class Database{
    public $server = SERVER;
    public $user = USER;
    public $pass = SENHA;
    public $db = BD;
    public $port = PORTA;

    public $link;
    public $error;

    public function __construct(){
        $this->connectDB();
    }
    private function connectDB(){
        $this->link = new mysqli($this->server,$this->user,$this->pass,$this->db,$this->port);

        if($this->link){
            $this->error="Connection failed".$this->connect_error;
            return false;
        }
    }
    public function select($query){
        $result=$this->link->query($query) or die($this->link->error.__LINE__);
        if($result->num_rows>0){
            return $result;
        }else{
            return false;
        }
    }
}
?>