package trabalho.dev.web.model.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity(name = "Classe")
public class ClasseDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(nullable = false, length = 40)
    private String nome;

    @Column(nullable = false)
    private double valor;

    @Column(nullable = false)
    private Date data;


    public ClasseDomain(String nome) {
        this.nome = nome;
    }

    public ClasseDomain(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }
}
